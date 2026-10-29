import { useEffect, useMemo, useRef, useState } from 'react'
import crescentMark from '../assets/logos/crescent-mark.png'
import { VERTEX_SHADER, FRAGMENT_SHADER } from './inauguration/silkShader.js'
import { DRAW_FROM, DRAW_FOR, playOpeningSound } from './inauguration/openingSound.js'
import { startPoppers } from './inauguration/poppers.js'

/**
 * INAUGURATION SHAWL
 * ---------------------------------------------------------------------------
 * A ceremonial reveal over the home page: two drapes of royal-red silk with
 * gold zari borders and buttas, hanging from gold satin ribbon swags with
 * curled ends, with a gold satin sash across the middle tied in a bow.
 *
 * The cloth is painted by a WebGL shader (inauguration/silkShader.js) that
 * lights every pixel — fold shadows, satin sheen, metallic gold — so it reads
 * as real fabric. Clicking (or pressing Enter on) the bow:
 *   1. unties the bow; the two halves of the sash swing down and fall away;
 *   2. draws the drapes aside — the top leads and the hem trails behind, the
 *      folds bunch up and deepen, and once the cloth arrives its hem swings
 *      back and settles; each drape is caught by a gold cord and tassel;
 *   3. when the shawl is half open, fires a party popper from each bottom
 *      corner and a confetti shower across the full width
 *      (inauguration/poppers.js); it flutters down over the revealed site.
 * The only sound is the cloth itself — the swish of the silk being drawn apart
 * and settling (inauguration/openingSound.js) — synthesised on the click, so
 * there is no audio file.
 * Without WebGL2 the overlay falls back to plain silk-red and simply fades.
 *
 * WHEN IT SHOWS
 *   - `INAUGURATION_ENABLED` switches the whole thing on or off.
 *   - Once opened, it stays open for the rest of that browser tab's session.
 *   - Add `?inaugurate` to the address to show it again regardless.
 */
export const INAUGURATION_ENABLED = true

const SEEN_KEY = 'cdoe-inaugurated'
/* The sequence, in seconds from the click (the drapes' timing is shared with the sound). */
const SASH_FROM = 0.12
const TIE_FROM = 2.35
const FADE_AT_MS = 3600 // the drapes fade away
const END_AT_MS = 5700 // the last of the confetti fades
const DONE_MS = 6400

function shouldShow() {
  if (!INAUGURATION_ENABLED) return false
  try {
    if (new URLSearchParams(window.location.search).has('inaugurate')) return true
    return sessionStorage.getItem(SEEN_KEY) !== '1'
  } catch {
    return true
  }
}

const clamp01 = (v) => Math.min(1, Math.max(0, v))
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2)

/* ================= The silk (WebGL) ================= */

function createRenderer(canvas) {
  const gl = canvas.getContext('webgl2', { alpha: true, premultipliedAlpha: true, antialias: false })
  if (!gl) return null
  const compile = (type, src) => {
    const sh = gl.createShader(type)
    gl.shaderSource(sh, src)
    gl.compileShader(sh)
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(sh))
    return sh
  }
  const prog = gl.createProgram()
  gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERTEX_SHADER))
  gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAGMENT_SHADER))
  gl.linkProgram(prog)
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog))
  gl.useProgram(prog)

  // One triangle that covers the whole screen.
  const buf = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buf)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
  const loc = gl.getAttribLocation(prog, 'aPos')
  gl.enableVertexAttribArray(loc)
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

  const names = ['uRes', 'uScale', 'uTime', 'uOpen', 'uDraw', 'uSettle', 'uVel', 'uSashY', 'uSashW', 'uSashA', 'uSashAlpha', 'uTie', 'uFolds']
  const u = Object.fromEntries(names.map((n) => [n, gl.getUniformLocation(prog, n)]))

  return {
    draw(p) {
      // Cap the pixel count so large or high-density screens stay smooth.
      const w = window.innerWidth
      const h = window.innerHeight
      const scale = Math.min(window.devicePixelRatio || 1, 1.5, Math.sqrt(2.4e6 / (w * h)))
      const cw = Math.round(w * scale)
      const ch = Math.round(h * scale)
      if (canvas.width !== cw || canvas.height !== ch) {
        canvas.width = cw
        canvas.height = ch
        gl.viewport(0, 0, cw, ch)
      }
      gl.uniform2f(u.uRes, cw, ch)
      gl.uniform1f(u.uScale, scale)
      gl.uniform1f(u.uTime, p.time)
      gl.uniform1f(u.uOpen, p.open)
      gl.uniform1f(u.uDraw, p.draw)
      gl.uniform1f(u.uSettle, p.settle)
      gl.uniform1f(u.uVel, p.vel)
      gl.uniform1f(u.uSashY, p.sashY * scale)
      gl.uniform1f(u.uSashW, p.sashW * scale)
      gl.uniform1f(u.uSashA, p.sashA)
      gl.uniform1f(u.uSashAlpha, p.sashAlpha)
      gl.uniform1f(u.uTie, p.tie)
      // About one fold per 85 CSS px of drape: fuller on a wide screen, never pinstripes on a phone.
      gl.uniform1f(u.uFolds, Math.max(4, Math.min(11, Math.round(w / 2 / 85))))
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    },
    dispose() {
      gl.deleteBuffer(buf)
      gl.deleteProgram(prog)
    },
  }
}

/* ================= Bow ================= */

function Bow() {
  // Gold satin: each loop is lit from the upper left, with a darker inner fold,
  // soft creases where it is gathered into the knot and a sheen along the top.
  // The viewBox is centred on the knot, so the knot sits exactly on the sash.
  return (
    <svg className="ic-bow-svg" viewBox="0 -2 240 168" aria-hidden="true">
      <defs>
        <linearGradient id="ic-satin" x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0" stopColor="#fff4d2" />
          <stop offset="0.22" stopColor="#f2d283" />
          <stop offset="0.5" stopColor="#c99434" />
          <stop offset="0.78" stopColor="#8d6118" />
          <stop offset="1" stopColor="#b5862c" />
        </linearGradient>
        <linearGradient id="ic-satin-inner" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5e3c08" />
          <stop offset="1" stopColor="#a87b25" />
        </linearGradient>
        <linearGradient id="ic-satin-tail" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#7d5512" />
          <stop offset="0.35" stopColor="#e7c26b" />
          <stop offset="0.55" stopColor="#fff0c4" />
          <stop offset="0.75" stopColor="#c08e30" />
          <stop offset="1" stopColor="#7d5512" />
        </linearGradient>
        <filter id="ic-soft" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="1.6" />
        </filter>
        <filter id="ic-bow-shadow" x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="1" dy="7" stdDeviation="5" floodColor="#1a0004" floodOpacity="0.6" />
        </filter>
      </defs>
      <g filter="url(#ic-bow-shadow)">
        <g className="ic-bow-tails">
          <path d="M112 90 C104 112 92 134 76 158 L92 150 L100 166 C110 140 118 116 124 94 Z" fill="url(#ic-satin-tail)" />
          <path d="M112 90 C106 108 98 126 88 144" stroke="#6b4709" strokeOpacity="0.35" strokeWidth="1.4" fill="none" />
          <path d="M128 90 C136 112 148 134 164 158 L148 150 L140 166 C130 140 122 116 116 94 Z" fill="url(#ic-satin-tail)" />
          <path d="M128 90 C134 108 142 126 152 144" stroke="#6b4709" strokeOpacity="0.35" strokeWidth="1.4" fill="none" />
        </g>
        <g className="ic-bow-loop ic-bow-loop-l">
          <path d="M120 82 C98 44 38 20 22 50 C10 76 46 100 120 84 Z" fill="url(#ic-satin)" />
          <path d="M120 82 C102 62 60 46 42 58 C58 66 92 76 120 84 Z" fill="url(#ic-satin-inner)" opacity="0.85" />
          <path d="M30 46 C46 28 82 34 106 60" stroke="#fffbe8" strokeOpacity="0.7" strokeWidth="4" fill="none" filter="url(#ic-soft)" />
          <path d="M120 83 C100 86 84 88 68 88" stroke="#6b4709" strokeOpacity="0.3" strokeWidth="1.2" fill="none" />
          <path d="M118 78 C108 70 98 64 86 60" stroke="#6b4709" strokeOpacity="0.28" strokeWidth="1.2" fill="none" />
        </g>
        <g className="ic-bow-loop ic-bow-loop-r">
          <path d="M120 82 C142 44 202 20 218 50 C230 76 194 100 120 84 Z" fill="url(#ic-satin)" />
          <path d="M120 82 C138 62 180 46 198 58 C182 66 148 76 120 84 Z" fill="url(#ic-satin-inner)" opacity="0.85" />
          <path d="M134 60 C158 36 192 30 210 44" stroke="#fffbe8" strokeOpacity="0.55" strokeWidth="4" fill="none" filter="url(#ic-soft)" />
          <path d="M120 83 C140 86 156 88 172 88" stroke="#6b4709" strokeOpacity="0.3" strokeWidth="1.2" fill="none" />
          <path d="M122 78 C132 70 142 64 154 60" stroke="#6b4709" strokeOpacity="0.28" strokeWidth="1.2" fill="none" />
        </g>
        <g className="ic-bow-knot">
          <path d="M106 70 C112 64 128 64 134 70 C138 78 138 88 134 95 C128 101 112 101 106 95 C102 88 102 78 106 70 Z" fill="url(#ic-satin)" />
          <path d="M110 72 C114 80 114 88 110 95" stroke="#6b4709" strokeOpacity="0.4" strokeWidth="1.3" fill="none" />
          <path d="M130 72 C126 80 126 88 130 95" stroke="#6b4709" strokeOpacity="0.4" strokeWidth="1.3" fill="none" />
          <path d="M116 70 C119 78 119 86 117 93" stroke="#fffbe8" strokeOpacity="0.65" strokeWidth="3" fill="none" filter="url(#ic-soft)" />
        </g>
      </g>
    </svg>
  )
}

/* ================= Styles ================= */

const styles = `
  .ic-overlay{
    position:fixed; inset:0; z-index:200;
    overflow:hidden;
    font-family:'Cinzel', Georgia, 'Times New Roman', serif;
    /* Behind the cloth while it is closed; clears as the drapes part. */
    background:#160006;
    transition:background-color .5s ease .45s, opacity .8s ease;
  }
  .ic-overlay.is-open{ pointer-events:none; background-color:transparent; }
  .ic-canvas, .ic-stage{ transition:opacity .8s ease; }
  .is-fading .ic-canvas, .is-fading .ic-stage{ opacity:0; }
  /* The poppers sit above everything and outlast the drapes a little, so the
     confetti keeps falling over the revealed site. */
  .ic-pop{ position:absolute; inset:0; width:100%; height:100%; z-index:5; pointer-events:none; transition:opacity .7s ease; }
  .is-ending .ic-pop{ opacity:0; }
  .ic-overlay.no-gl{ background:radial-gradient(ellipse at 50% 40%, #a3142b, #5a0011 75%); }
  .ic-overlay.no-gl.is-open{ opacity:0; transition:opacity .9s ease .3s; }
  /* The site justifies paragraphs globally; everything here is centred. */
  .ic-overlay p, .ic-overlay h2{ text-align:center; hyphens:manual; -webkit-hyphens:manual; }

  .ic-canvas{ position:absolute; inset:0; width:100%; height:100%; display:block; }

  /* ---- The centred column: title, bow, hint ---- */
  .ic-stage{
    position:absolute; inset:0; z-index:2;
    padding:64px 0 48px;
    display:flex; flex-direction:column; align-items:center; justify-content:center;
    gap:clamp(18px, 4.5vh, 40px);
  }
  .ic-title{
    position:relative;
    width:min(92vw, 820px);
    padding:clamp(14px, 3vh, 26px) 16px;
    transition:opacity .5s ease .05s, transform .7s ease .05s;
  }
  /* A soft shadow behind the lettering so it reads cleanly over the folds. */
  .ic-title::before{
    content:''; position:absolute; inset:-12% -10%; z-index:-1;
    background:radial-gradient(ellipse at center, rgba(30,0,6,.55), rgba(30,0,6,0) 70%);
  }
  .is-open .ic-title{ opacity:0; transform:translateY(-24px); }
  .ic-crest{
    width:clamp(56px, 8.5vh, 82px); height:clamp(56px, 8.5vh, 82px);
    margin:0 auto clamp(10px, 2vh, 16px); border-radius:50%;
    background:#fffaf0;
    border:3px solid #e3bd5c;
    box-shadow:0 0 0 4px rgba(120,10,24,.9), 0 0 0 6px #c9972f, 0 10px 24px rgba(0,0,0,.5);
    display:flex; align-items:center; justify-content:center;
  }
  .ic-crest img{ width:72%; height:72%; object-fit:contain; }
  .ic-eyebrow{
    margin:0 0 6px; color:#f3d98b;
    font-size:clamp(.7rem, 1.5vw, .92rem);
    letter-spacing:.42em; padding-left:.42em; /* keeps spaced capitals optically centred */
    text-transform:uppercase;
    text-shadow:0 2px 6px rgba(0,0,0,.6);
  }
  .ic-heading{
    margin:0; font-weight:700; line-height:1.1;
    font-size:clamp(1.65rem, 6.4vw, 3.6rem);
    letter-spacing:.03em;
    background:linear-gradient(180deg, #fff6d0 0%, #f2cf6b 45%, #b8862b 80%, #f6dd8a 100%);
    -webkit-background-clip:text; background-clip:text; color:transparent;
    filter:drop-shadow(0 3px 4px rgba(30,0,6,.7));
  }
  .ic-rule{
    width:min(60%, 340px); height:2px; margin:clamp(8px, 1.6vh, 14px) auto;
    background:linear-gradient(90deg, transparent, #e3bd5c, transparent);
  }
  .ic-sub{
    margin:0; color:#f8e7b5;
    font-size:clamp(.66rem, 1.6vw, .98rem);
    letter-spacing:.14em; padding-left:.14em;
    text-transform:uppercase; line-height:1.5;
    text-shadow:0 2px 6px rgba(0,0,0,.65);
  }
  .ic-sub-small{ margin-top:4px; font-size:clamp(.56rem, 1.25vw, .78rem); color:#f1dca0; }

  /* The shader draws the sash through the bow's centre, so the two always meet. */
  .ic-ribbon{ position:relative; width:100%; display:flex; justify-content:center; align-items:center; }

  .ic-bow{
    position:relative; z-index:1;
    width:clamp(140px, 21vw, 220px);
    background:none; border:none; padding:0; margin:0; cursor:pointer;
    -webkit-tap-highlight-color:transparent;
    animation:ic-breathe 2.8s ease-in-out infinite;
  }
  .ic-bow:focus{ outline:none; }
  .ic-bow:hover .ic-bow-svg{ transform:scale(1.04); }
  /* Keyboard focus: a soft gold glow on the bow itself, not a ring around it. */
  .ic-bow:focus-visible .ic-bow-svg{ filter:drop-shadow(0 0 10px #fff2c2) drop-shadow(0 0 4px #fff2c2); }
  .ic-bow-svg{ width:100%; height:auto; display:block; overflow:visible; transition:transform .3s ease; }
  @keyframes ic-breathe{
    0%,100%{ filter:drop-shadow(0 0 0 rgba(255,230,150,0)); }
    50%{ filter:drop-shadow(0 0 14px rgba(255,226,140,.55)); }
  }
  .ic-bow-loop, .ic-bow-tails, .ic-bow-knot{
    transform-box:fill-box;
    transition:transform .65s cubic-bezier(.5,0,.3,1), opacity .5s ease .15s;
  }
  .ic-bow-loop-l{ transform-origin:100% 60%; }
  .ic-bow-loop-r{ transform-origin:0% 60%; }
  .ic-bow-knot{ transform-origin:50% 50%; }
  .ic-bow-tails{ transform-origin:50% 0%; }
  .is-open .ic-bow{ animation:none; pointer-events:none; }
  .is-open .ic-bow-loop-l{ transform:translate(-40px, -10px) rotate(-55deg) scale(.6); opacity:0; }
  .is-open .ic-bow-loop-r{ transform:translate(40px, -10px) rotate(55deg) scale(.6); opacity:0; }
  .is-open .ic-bow-knot{ transform:scale(0); opacity:0; }
  .is-open .ic-bow-tails{ transform:translateY(60px) scaleY(.4); opacity:0; }

  .ic-hint{
    margin:0; color:#f8e7b5;
    font-size:clamp(.68rem, 1.5vw, .92rem);
    letter-spacing:.26em; padding-left:.26em;
    text-transform:uppercase;
    text-shadow:0 2px 6px rgba(0,0,0,.7);
    animation:ic-hint 2.6s ease-in-out infinite;
    transition:opacity .4s ease;
  }
  @keyframes ic-hint{ 0%,100%{ opacity:.6; } 50%{ opacity:1; } }
  .is-open .ic-hint{ animation:none; opacity:0; }

  @media (max-width:640px){
    .ic-sub-small{ letter-spacing:.08em; padding-left:.08em; }
  }
  @media (prefers-reduced-motion: reduce){
    .ic-bow, .ic-hint{ animation:none; }
  }
`

/* ================= Component ================= */

export default function InaugurationCurtain() {
  const [visible, setVisible] = useState(shouldShow)
  const [open, setOpen] = useState(false)
  const [fading, setFading] = useState(false)
  const [ending, setEnding] = useState(false)
  const [noGl, setNoGl] = useState(false)
  const canvasRef = useRef(null)
  const popRef = useRef(null)
  const bowRef = useRef(null)
  const openedAt = useRef(null)
  const reducedMotion = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches,
    [],
  )

  // Paint the silk every frame while the overlay is up.
  useEffect(() => {
    if (!visible) return
    let renderer = null
    try {
      renderer = createRenderer(canvasRef.current)
    } catch (err) {
      console.warn('Inauguration shawl: WebGL unavailable, using the plain fallback.', err)
    }
    if (!renderer) {
      setNoGl(true)
      return
    }
    let raf = 0
    const frame = (ms) => {
      const time = ms / 1000
      const bow = bowRef.current?.getBoundingClientRect()
      const sashY = bow ? bow.top + bow.height / 2 : window.innerHeight / 2
      const sashW = Math.min(48, Math.max(30, window.innerWidth * 0.046))
      let open = 0
      let draw = 0
      let settle = -1
      let vel = 0
      let sashA = 0
      let sashAlpha = 1
      let tie = 0
      if (openedAt.current != null) {
        const t = time - openedAt.current
        const k = clamp01((t - SASH_FROM) / 0.95)
        // The sash swings down from each outer end and settles, then fades.
        sashA = 1.42 * (1 - Math.exp(-4 * k) * Math.cos(7 * k))
        // Gone quickly, so it doesn't cross the party poppers in the corners.
        sashAlpha = 1 - clamp01((t - 0.45) / 0.45)
        const d = clamp01((t - DRAW_FROM) / DRAW_FOR)
        draw = d
        open = easeInOut(d)
        vel = Math.sin(Math.PI * d)
        if (d >= 1) settle = t - (DRAW_FROM + DRAW_FOR)
        tie = clamp01((t - TIE_FROM) / 0.4)
      }
      renderer.draw({ time, open, draw, settle, vel, sashY, sashW, sashA, sashAlpha, tie })
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    return () => {
      cancelAnimationFrame(raf)
      renderer.dispose()
    }
  }, [visible])

  // Hold the page still behind the shawl, and put focus on the bow.
  useEffect(() => {
    if (!visible || open) return
    const html = document.documentElement
    const previous = html.style.overflow
    html.style.overflow = 'hidden'
    bowRef.current?.focus({ preventScroll: true })
    return () => {
      html.style.overflow = previous
    }
  }, [visible, open])

  useEffect(() => {
    if (!open || !visible) return
    const quick = reducedMotion || noGl
    const fade = setTimeout(() => setFading(true), quick ? 300 : FADE_AT_MS)
    const end = setTimeout(() => setEnding(true), quick ? 300 : END_AT_MS)
    const done = setTimeout(() => setVisible(false), quick ? 1200 : DONE_MS)
    // The poppers go off when the shawl is half open.
    const stopPoppers = reducedMotion ? null : startPoppers(popRef.current, { delay: DRAW_FROM + DRAW_FOR * 0.5 })
    return () => {
      clearTimeout(fade)
      clearTimeout(end)
      clearTimeout(done)
      stopPoppers?.()
    }
  }, [open, visible, reducedMotion, noGl])

  if (!visible) return null

  const inaugurate = () => {
    if (open) return
    playOpeningSound()
    openedAt.current = performance.now() / 1000
    setOpen(true)
    try {
      sessionStorage.setItem(SEEN_KEY, '1')
    } catch {
      /* private mode: it simply shows again next time */
    }
  }

  return (
    <div
      className={`ic-overlay${open ? ' is-open' : ''}${fading ? ' is-fading' : ''}${ending ? ' is-ending' : ''}${noGl ? ' no-gl' : ''}`}
      role="dialog"
      aria-modal={!open}
      aria-label="Inauguration of Crescent Online"
    >
      <style>{styles}</style>

      <canvas ref={canvasRef} className="ic-canvas" aria-hidden="true" />

      <div className="ic-stage">
        <div className="ic-title">
          <div className="ic-crest">
            <img src={crescentMark} alt="" />
          </div>
          <p className="ic-eyebrow">Grand Inauguration</p>
          <h2 className="ic-heading">Crescent Online</h2>
          <div className="ic-rule" />
          <p className="ic-sub">Centre for Distance and Online Education</p>
          <p className="ic-sub ic-sub-small">B.S. Abdur Rahman Crescent Institute of Science &amp; Technology</p>
        </div>

        <div className="ic-ribbon">
          <button
            ref={bowRef}
            type="button"
            className="ic-bow"
            onClick={inaugurate}
            aria-label="Untie the ribbon to open the website"
          >
            <Bow />
          </button>
        </div>

        <p className="ic-hint" aria-hidden="true">Untie the ribbon to inaugurate</p>
      </div>

      <canvas ref={popRef} className="ic-pop" aria-hidden="true" />
    </div>
  )
}
