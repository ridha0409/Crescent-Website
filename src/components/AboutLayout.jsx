import AboutSidebar from './AboutSidebar.jsx'
import PageHeader from './PageHeader.jsx'

/*
 * ABOUT LAYOUT — the one shell every About Us page renders inside.
 * ---------------------------------------------------------------------------
 * Before this existed each About page hand-rolled its own wrapper. Half of
 * them used `container-xl` (max-w-7xl, px-5 sm:px-8) and half used
 * `max-w-6xl mx-auto px-4 lg:px-8`, so the sidebar sat at a different width
 * and a different left edge depending on which dropdown item you clicked.
 *
 * Every About route now renders <AboutLayout>, which pins:
 *   - the page container   (container-xl)
 *   - the vertical rhythm  (py-10)
 *   - the sidebar rail     (fixed 264px, from AboutSidebar)
 *   - the header block     (PageHeader, so the eyebrow / title / rule / lede
 *                           are identical on all of them)
 *
 * `items-start` matters: without it the flex row stretches the sidebar to the
 * height of the content column, which is what made the rail look like a
 * different size on long pages versus short ones.
 */
export default function AboutLayout({
  title,
  eyebrow = 'About Us',
  lede,
  children,
  contentRef,
  contentClassName = '',
}) {
  return (
    <section className="container-xl py-10">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <AboutSidebar />

        <div ref={contentRef} className={`flex-1 min-w-0 ${contentClassName}`}>
          <PageHeader eyebrow={eyebrow} title={title} lede={lede} className="mb-8" />
          {children}
        </div>
      </div>
    </section>
  )
}
