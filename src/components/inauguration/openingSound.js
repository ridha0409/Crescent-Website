/**
 * The sound of the shawl being opened — cloth only, no bells or effects: a
 * soft swish as the sash slips away, the full, smooth swish of the silk as the
 * two drapes are drawn apart (one on each side), and a gentle settle as the
 * cloth comes to rest and its hem swings back.
 *
 * Everything is synthesised with the Web Audio API — there is no audio file to
 * load, and because it starts on the click itself, browsers allow it to play.
 *
 * `scheduleOpeningSound(ctx, destination, start)` builds the whole sound on any
 * AudioContext (or OfflineAudioContext, which is how it can be checked without
 * speakers). `playOpeningSound()` is the live version used by the page.
 *
 * Times are in seconds from the click and match the animation in
 * InaugurationCurtain.jsx: the drapes move from DRAW_FROM for DRAW_FOR, then
 * their hems swing back and forth, smaller each time, for SETTLE_FOR seconds.
 * The swing (SWING_RATE, SWING_DECAY) is the same one the shader draws.
 */
export const DRAW_FROM = 0.45
export const DRAW_FOR = 2.1
export const SETTLE_FOR = 3.7
export const SWING_RATE = 4.2 // radians per second: one swing every ~0.75 s
export const SWING_DECAY = 0.5

function noiseBuffer(ctx, seconds) {
  const len = Math.floor(ctx.sampleRate * seconds)
  const buffer = ctx.createBuffer(1, len, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  // Softened (pink-ish) noise: closer to cloth than the hiss of white noise.
  let last = 0
  for (let i = 0; i < len; i++) {
    last = 0.86 * last + 0.14 * (Math.random() * 2 - 1)
    data[i] = last * 3.2
  }
  return buffer
}

/** Rises and falls with the cloth's speed — silent at both ends, no hard edges. */
function speedCurve(peak, points = 96) {
  const curve = new Float32Array(points)
  for (let i = 0; i < points; i++) {
    const t = i / (points - 1)
    curve[i] = Math.max(0.0001, peak * Math.sin(Math.PI * t) ** 1.6)
  }
  return curve
}

function panner(ctx, pan) {
  if (!ctx.createStereoPanner) return ctx.createGain()
  const p = ctx.createStereoPanner()
  p.pan.value = pan
  return p
}

/**
 * One swish of cloth: a band of soft noise whose loudness and brightness follow
 * the movement, with a faint, slow waver so it breathes like real fabric.
 */
function swish(ctx, out, buffer, { start, dur, peak, low, high, pan, offset }) {
  const src = ctx.createBufferSource()
  src.buffer = buffer

  const band = ctx.createBiquadFilter()
  band.type = 'bandpass'
  band.Q.value = 0.5
  band.frequency.setValueAtTime(low, start)
  band.frequency.exponentialRampToValueAtTime(high, start + dur * 0.5)
  band.frequency.exponentialRampToValueAtTime(low, start + dur)

  // A touch of air on top — the smooth sheen of silk sliding over itself.
  const shelf = ctx.createBiquadFilter()
  shelf.type = 'highshelf'
  shelf.frequency.value = 3000
  shelf.gain.value = 3

  const swell = ctx.createGain()
  swell.gain.setValueAtTime(0.0001, start)
  swell.gain.setValueCurveAtTime(speedCurve(peak), start, dur)

  const waver = ctx.createGain()
  waver.gain.value = 0.92
  const lfo = ctx.createOscillator()
  lfo.frequency.value = 3.2
  const depth = ctx.createGain()
  depth.gain.value = 0.08
  lfo.connect(depth).connect(waver.gain)

  src.connect(band).connect(shelf).connect(swell).connect(waver).connect(panner(ctx, pan)).connect(out)
  src.start(start, offset)
  src.stop(start + dur + 0.05)
  lfo.start(start)
  lfo.stop(start + dur + 0.05)
}

/** A faint, fine texture of silk threads brushing, kept well under the swish. */
function silkTexture(ctx, out, buffer, start, dur, count) {
  for (let i = 0; i < count; i++) {
    let t
    do {
      t = Math.random()
    } while (Math.random() > Math.sin(Math.PI * t))
    const at = start + t * dur
    const len = 0.03 + Math.random() * 0.05
    const src = ctx.createBufferSource()
    src.buffer = buffer
    const hp = ctx.createBiquadFilter()
    hp.type = 'bandpass'
    hp.Q.value = 0.8
    hp.frequency.value = 2500 + Math.random() * 2500
    const g = ctx.createGain()
    const peak = 0.03 + Math.random() * 0.04
    g.gain.setValueAtTime(0.0001, at)
    g.gain.exponentialRampToValueAtTime(peak, at + len * 0.4)
    g.gain.exponentialRampToValueAtTime(0.0001, at + len)
    src.connect(hp).connect(g).connect(panner(ctx, Math.random() * 1.4 - 0.7)).connect(out)
    src.start(at, Math.random() * 2)
    src.stop(at + len + 0.02)
  }
}

export function scheduleOpeningSound(ctx, destination, start) {
  // A gentle compressor keeps the swish full and even, never harsh or clipped.
  const comp = ctx.createDynamicsCompressor()
  comp.threshold.value = -18
  comp.knee.value = 12
  comp.ratio.value = 3
  comp.attack.value = 0.003
  comp.release.value = 0.25
  comp.connect(destination)
  const master = ctx.createGain()
  master.gain.value = 0.95
  master.connect(comp)
  const buffer = noiseBuffer(ctx, 4)

  // 1. The sash slipping away: a short, soft swish.
  swish(ctx, master, buffer, { start: start + 0.08, dur: 0.6, peak: 0.35, low: 700, high: 1600, pan: 0, offset: 0.2 })

  // 2. The silk drawn apart: one long swish for each drape, left and right.
  //    The hem trails the top of the cloth, so each swish lasts a little longer
  //    than the draw and tails off as the cloth slows.
  const s = start + DRAW_FROM
  const dur = DRAW_FOR + 0.2
  swish(ctx, master, buffer, { start: s, dur, peak: 0.85, low: 520, high: 1900, pan: -0.6, offset: 0.9 })
  swish(ctx, master, buffer, { start: s + 0.05, dur: dur - 0.05, peak: 0.85, low: 560, high: 1750, pan: 0.6, offset: 2.1 })
  // The weight of the cloth, underneath.
  swish(ctx, master, buffer, { start: s, dur, peak: 0.45, low: 180, high: 420, pan: 0, offset: 1.4 })
  silkTexture(ctx, master, buffer, s, dur, 26)

  // 3. Settling: the hems swing back and forth, smaller each time, and each
  //    swing brushes the air with a softer swish — alternating sides — over a
  //    faint, fading rustle of the cloth coming to rest.
  const settle = start + DRAW_FROM + DRAW_FOR
  const swingGap = Math.PI / SWING_RATE
  for (let i = 0; i * swingGap < SETTLE_FOR - 0.5; i++) {
    const at = settle - 0.15 + i * swingGap
    const fade = Math.exp(-SWING_DECAY * i * swingGap)
    const pan = i % 2 ? 0.45 : -0.45
    swish(ctx, master, buffer, { start: at, dur: 0.75, peak: 0.34 * fade, low: 320, high: 1000, pan, offset: 0.3 + i * 0.37 })
    swish(ctx, master, buffer, { start: at + 0.05, dur: 0.7, peak: 0.3 * fade, low: 340, high: 900, pan: -pan, offset: 2.2 + i * 0.29 })
  }
  const bed = ctx.createBufferSource()
  bed.buffer = buffer
  const bedBand = ctx.createBiquadFilter()
  bedBand.type = 'bandpass'
  bedBand.Q.value = 0.5
  bedBand.frequency.value = 700
  const bedGain = ctx.createGain()
  bedGain.gain.setValueAtTime(0.0001, settle - 0.2)
  bedGain.gain.exponentialRampToValueAtTime(0.12, settle + 0.3)
  bedGain.gain.setValueAtTime(0.12, settle + SETTLE_FOR - 1.4)
  bedGain.gain.exponentialRampToValueAtTime(0.0001, settle + SETTLE_FOR)
  bed.connect(bedBand).connect(bedGain).connect(master)
  bed.start(settle - 0.2, 0.6)
  bed.stop(settle + SETTLE_FOR + 0.05)
}

export function playOpeningSound() {
  const AC = window.AudioContext || window.webkitAudioContext
  if (!AC) return
  let ctx
  try {
    ctx = new AC()
  } catch {
    return
  }
  // Some browsers create the context suspended; the click lets us resume it.
  ctx.resume?.().catch(() => {})
  scheduleOpeningSound(ctx, ctx.destination, ctx.currentTime + 0.03)
  setTimeout(() => ctx.close().catch(() => {}), (DRAW_FROM + DRAW_FOR + SETTLE_FOR + 0.8) * 1000)
}
