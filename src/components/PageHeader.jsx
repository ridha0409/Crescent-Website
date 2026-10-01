/**
 * PageHeader — the standard heading block for every inner page.
 *
 * Before this existed each page hand-rolled its own heading, so the eyebrow,
 * the title size, the gold/crimson rule and the space below the lede drifted
 * from page to page. Every inner page now renders this, which is what keeps
 * the vertical rhythm identical across the whole site.
 *
 *   <PageHeader
 *     eyebrow="CDOE · UGC Corner"     // optional breadcrumb-style label
 *     title="Admission Notification"
 *     lede="One sentence of context." // optional
 *     align="left"                    // 'left' (default) | 'center'
 *   />
 */
export default function PageHeader({ eyebrow, title, lede, align = 'left', className = '' }) {
  const centered = align === 'center'

  return (
    <header className={`${centered ? 'text-center' : ''} ${className}`}>
      {eyebrow && (
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
          {eyebrow}
        </p>
      )}

      {/* Scales smoothly with the viewport instead of stepping at one
          breakpoint, so a long title never crowds a small phone. */}
      <h1 className="text-[clamp(1.6rem,5.5vw,1.95rem)] font-bold text-navy-800 text-balance leading-tight">
        {title}
        <span
          className={`block w-14 h-1 bg-crimson-600 mt-3 rounded-full ${
            centered ? 'mx-auto' : ''
          }`}
        />
      </h1>

      {lede && (
        <p
          className={`text-slate-500 mt-4 max-w-2xl ${centered ? 'mx-auto' : ''}`}
        >
          {lede}
        </p>
      )}
    </header>
  )
}
