import { useEffect, useState } from 'react'
import { testimonials, gallery } from '../data/testimonials.js'

/*
 * HOME — STUDENT TESTIMONIALS + GALLERY
 * ---------------------------------------------------------------------------
 * Two columns that stay aligned to the pixel: testimonials on the left, the
 * campus gallery on the right. The gallery shows one photograph at a time and
 * rotates itself every few seconds; arrows and dots are there for anyone who
 * wants to drive it. Photographs are display only — there is no full-screen
 * single-image view. This replaces the "Why Learn With Crescent" and
 * "Approvals & Accreditations" pair that used to sit here — both of those facts
 * still appear elsewhere on the site (the accreditation badges in the footer
 * and on /about, the programme facts on every programme page), so nothing the
 * Institute publishes was lost.
 *
 * The quotes and the photographs both come from src/data/testimonials.js.
 *
 * NOTE: every testimonial currently in that file is a placeholder and renders a
 * "SAMPLE" badge until the real quote replaces it. See the file for how.
 */

const styles = `
  .saa-wrapper *{box-sizing:border-box;}
  .saa-wrapper{
    --navy:#1C315E;
    --orange:#A02022;
    --bg:#F5F5F5;
    --card:#ffffff;
    --text:#1C315E;
    --muted:#5C6880;
    font-family: 'Poppins','Segoe UI',Arial,sans-serif;
    background:var(--bg);
    padding:56px 6vw;
  }
  .saa-grid{
    display:grid;
    grid-template-columns:1fr 1fr;
    align-items:stretch;
    gap:48px;
    max-width:1500px;
    margin:0 auto;
  }
  @media(max-width:900px){
    .saa-grid{grid-template-columns:1fr;}
  }

  .saa-column{
    display:flex;
    flex-direction:column;
    height:100%;
    /* Grid items default to min-width:auto, which let a wide card push this
       column past the viewport and gave the page a horizontal scrollbar. */
    min-width:0;
  }

  /* Heading block: a fixed two-line box, so a heading that wraps and one that
     does not still put their underline — and the card below it — on the same
     line. */
  .saa-col-title{
    font-size:2rem;
    font-weight:700;
    color:var(--navy);
    margin:0 0 14px 0;
    line-height:1.25;
    min-height:2.5em;
    display:flex;
    align-items:flex-start;
  }
  .saa-underline{
    width:70px;
    height:4px;
    background:var(--orange);
    border-radius:2px;
    margin-bottom:26px;
  }

  /* Shared shell — the carousel and the gallery grid fill this identically, so
     the two columns end at the same height. */
  .saa-carousel{
    position:relative;
    width:100%;
    height:300px;
    flex-shrink:0;
  }

  .saa-card{
    position:relative;
    height:100%;
    width:100%;
    border-radius:22px;
    background:var(--card);
    box-shadow:0 10px 30px rgba(20,26,77,0.08);
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:flex-start;
    text-align:left;
    padding:36px clamp(24px, 4vw, 44px);
    overflow:hidden;
  }

  /* The opening quotation mark, set as decoration behind the text. */
  .saa-quote-mark{
    position:absolute;
    top:6px;
    right:26px;
    font-size:7rem;
    line-height:1;
    font-family:Georgia,'Times New Roman',serif;
    color:rgba(28,49,94,0.07);
    pointer-events:none;
    user-select:none;
  }

  .saa-eyebrow{
    text-transform:uppercase;
    letter-spacing:.14em;
    font-size:.72rem;
    font-weight:700;
    color:var(--orange);
    margin:0 0 12px 0;
    display:flex;
    align-items:center;
    gap:10px;
  }

  /* Shown only while an entry is flagged placeholder in the data file. */
  .saa-sample{
    display:inline-block;
    padding:2px 8px;
    border-radius:999px;
    background:#FDE68A;
    color:#78350F;
    font-size:.6rem;
    letter-spacing:.1em;
    font-weight:800;
  }

  .saa-quote{
    font-size:1.06rem;
    color:var(--text);
    line-height:1.65;
    max-width:44ch;
    margin:0 0 20px 0;
    font-style:italic;
  }

  .saa-attrib{
    margin:0;
    font-size:.95rem;
    font-weight:700;
    color:var(--navy);
  }
  .saa-attrib-meta{
    margin:2px 0 0 0;
    font-size:.85rem;
    color:var(--muted);
  }

  /* ---------------- Gallery ----------------
     One photograph at a time, filling the same shell as the testimonial card,
     crossfading on a timer. Every slide stays mounted and is faded with
     opacity — swapping a single <img> src would flash white between photos. */
  .saa-gallery{
    position:relative;
    height:100%;
    width:100%;
    border-radius:22px;
    overflow:hidden;
    background:#dfe3ee;
    box-shadow:0 10px 30px rgba(20,26,77,0.12);
    /* Display only — the photographs do not open individually. */
    display:block;
  }
  .saa-slide{
    position:absolute;
    inset:0;
    opacity:0;
    transition:opacity .9s ease;
  }
  .saa-slide.active{ opacity:1; }
  .saa-slide img{
    width:100%;
    height:100%;
    object-fit:cover;
    display:block;
  }
  .saa-gallery-caption{
    position:absolute;
    left:0; right:0; bottom:0;
    padding:34px 22px 16px;
    background:linear-gradient(to top, rgba(12,20,44,0.82), transparent);
    color:#fff;
    font-size:.95rem;
    font-weight:600;
    text-align:left;
    letter-spacing:.01em;
    z-index:2;
    display:flex;
    align-items:center;
    justify-content:space-between;
    gap:12px;
  }
  .saa-gallery-counter{
    font-size:.72rem;
    font-weight:500;
    color:rgba(255,255,255,0.75);
    white-space:nowrap;
    font-variant-numeric:tabular-nums;
  }
  /* Someone who has asked for less motion gets a still first photo — the
     auto-advance is switched off in JS to match. */
  @media(prefers-reduced-motion: reduce){
    .saa-slide{ transition:none; }
  }

  .saa-nav-btn{
    position:absolute;
    top:50%;
    transform:translateY(-50%);
    width:38px;
    height:38px;
    border-radius:50%;
    background:#fff;
    border:none;
    box-shadow:0 4px 12px rgba(0,0,0,0.14);
    display:flex;
    align-items:center;
    justify-content:center;
    cursor:pointer;
    z-index:5;
    color:var(--navy);
    font-size:18px;
    line-height:1;
    transition:transform .15s ease, background .15s ease, color .15s ease;
  }
  .saa-nav-btn:hover{ background:var(--navy); color:#fff; transform:translateY(-50%) scale(1.06); }
  .saa-nav-left{ left:10px; }
  .saa-nav-right{ right:10px; }

  .saa-dots{
    display:flex;
    align-items:center;
    gap:8px;
    height:26px;
    margin-top:18px;
    justify-content:flex-start;
  }
  .saa-dot{
    width:8px;
    height:8px;
    border-radius:50%;
    background:#c9cde3;
    cursor:pointer;
    transition:all .2s ease;
    border:none;
    padding:0;
    flex-shrink:0;
  }
  .saa-dot.active{
    width:28px;
    border-radius:5px;
    background:var(--navy);
  }

  @media(max-width:1100px){
    .saa-col-title{ font-size:1.75rem; }
    .saa-quote{ font-size:1rem; }
  }
  @media(max-width:900px){
    /* Single column — nothing left to align against, so let the heading
       collapse back to its natural height, and drop the height-matching row. */
    .saa-col-title{ min-height:0; }
  }
  @media(max-width:640px){
    .saa-wrapper{ padding:44px 5vw; }
    .saa-grid{ gap:36px; }
    .saa-col-title{ font-size:1.6rem; }
    .saa-underline{ margin-bottom:22px; }
    .saa-carousel{ height:340px; }
    .saa-card{ padding:28px 22px; }
    .saa-quote{ font-size:.95rem; }
    .saa-nav-btn{ width:34px; height:34px; }
    .saa-nav-left{ left:6px; }
    .saa-nav-right{ right:6px; }
  }
`

/* ================= Testimonial card ================= */

function TestimonialCard({ item, onPrev, onNext }) {
  return (
    <div className="saa-carousel">
      <button className="saa-nav-btn saa-nav-left" onClick={onPrev} aria-label="Previous testimonial">
        &#8249;
      </button>
      <button className="saa-nav-btn saa-nav-right" onClick={onNext} aria-label="Next testimonial">
        &#8250;
      </button>

      <figure className="saa-card">
        <span className="saa-quote-mark" aria-hidden="true">&ldquo;</span>

        <p className="saa-eyebrow">Student voice</p>

        <blockquote className="saa-quote">&ldquo;{item.quote}&rdquo;</blockquote>

        <figcaption>
          <p className="saa-attrib">{item.name}</p>
          <p className="saa-attrib-meta">
            {item.programme}
            {item.year ? ` · ${item.year}` : ''}
          </p>
        </figcaption>
      </figure>
    </div>
  )
}

function Dots({ count, index, onSelect, label }) {
  return (
    <div className="saa-dots">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          className={`saa-dot ${i === index ? 'active' : ''}`}
          onClick={() => onSelect(i)}
          aria-label={`Go to ${label} ${i + 1}`}
        />
      ))}
    </div>
  )
}

/* ================= Section ================= */

/** How long each photograph is held before the gallery moves on. */
const SLIDE_MS = 4500

export default function TestimonialsAndGallery() {
  const [quoteIndex, setQuoteIndex] = useState(0)
  const [slide, setSlide] = useState(0)
  const [paused, setPaused] = useState(false)

  const stepQuote = (dir) =>
    setQuoteIndex((i) => (i + dir + testimonials.length) % testimonials.length)

  const stepSlide = (dir) => setSlide((i) => (i + dir + gallery.length) % gallery.length)
  const selectSlide = (i) => setSlide(i)

  /*
   * Auto-rotation. It stands down while the pointer or keyboard focus is on the
   * gallery, so a photo never slides out from under someone looking at it.
   * Honours prefers-reduced-motion by not running at all. `slide` is in the dependency list on purpose: stepping by hand
   * tears the interval down and starts a fresh one, so a click is never
   * followed by an automatic advance a moment later.
   */
  useEffect(() => {
    if (paused || gallery.length < 2) return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return

    const id = setInterval(() => setSlide((i) => (i + 1) % gallery.length), SLIDE_MS)
    return () => clearInterval(id)
  }, [paused, slide])

  return (
    <div className="saa-wrapper">
      <style>{styles}</style>

      <div className="saa-grid">
        {/* LEFT: student testimonials */}
        <div className="saa-column">
          <h2 className="saa-col-title">Student Testimonials</h2>
          <div className="saa-underline" />

          <TestimonialCard
            item={testimonials[quoteIndex]}
            onPrev={() => stepQuote(-1)}
            onNext={() => stepQuote(1)}
          />

          <Dots
            count={testimonials.length}
            index={quoteIndex}
            onSelect={setQuoteIndex}
            label="testimonial"
          />
        </div>

        {/* RIGHT: campus gallery */}
        <div className="saa-column">
          <h2 className="saa-col-title">Gallery</h2>
          <div className="saa-underline" />

          <div
            className="saa-carousel"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
          >
            <button
              className="saa-nav-btn saa-nav-left"
              onClick={() => stepSlide(-1)}
              aria-label="Previous photograph"
            >
              &#8249;
            </button>
            <button
              className="saa-nav-btn saa-nav-right"
              onClick={() => stepSlide(1)}
              aria-label="Next photograph"
            >
              &#8250;
            </button>

            <div className="saa-gallery">
              {gallery.map((item, i) => (
                <span
                  key={item.caption + i}
                  className={`saa-slide${i === slide ? ' active' : ''}`}
                  aria-hidden={i !== slide}
                >
                  <img
                    src={item.src}
                    alt={i === slide ? item.caption : ''}
                    /* The first photo is above the fold on a tall screen, the
                       rest are only ever seen after it. */
                    loading={i === 0 ? 'eager' : 'lazy'}
                  />
                </span>
              ))}

              <span className="saa-gallery-caption">
                {gallery[slide].caption}
                <span className="saa-gallery-counter">
                  {slide + 1} / {gallery.length}
                </span>
              </span>
            </div>
          </div>

          <Dots count={gallery.length} index={slide} onSelect={selectSlide} label="photograph" />
        </div>
      </div>

    </div>
  )
}
