import { useId, useState } from 'react'
import { Plus, Minus } from 'lucide-react'

/*
 * FAQ ACCORDION — shared by the home-page teaser and the full FAQ page.
 * ---------------------------------------------------------------------------
 * One implementation so the two never diverge in behaviour or styling.
 *
 * Accessibility: the trigger is a real <button> carrying aria-expanded and
 * aria-controls, and the panel is a region labelled by its trigger — which is
 * what lets a screen reader announce "collapsed / expanded" instead of reading
 * a bare line of text.
 *
 * The panel is rendered but hidden when closed rather than unmounted, so the
 * browser's own find-in-page can still reach an answer that is collapsed.
 */

function FaqItem({ item, isOpen, onToggle }) {
  const uid = useId()
  const panelId = `faq-panel-${uid}`
  const buttonId = `faq-button-${uid}`

  return (
    <div className="glass rounded-2xl overflow-hidden transition-all duration-350">
      <h3>
        <button
          id={buttonId}
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="w-full flex items-start justify-between gap-4 px-5 py-4 text-left
                     text-sm font-medium text-navy-800 hover:text-crimson-600
                     transition-colors duration-350"
        >
          <span className="leading-snug">{item.q}</span>
          {isOpen ? (
            <Minus size={16} className="text-gold shrink-0 mt-0.5" />
          ) : (
            <Plus size={16} className="text-gold shrink-0 mt-0.5" />
          )}
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        hidden={!isOpen}
        className="px-5 pb-4 space-y-3"
      >
        {item.a.map((paragraph, i) => (
          <p key={i} className="text-sm text-slate-500 leading-relaxed">
            {paragraph}
          </p>
        ))}

        {item.table && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse mt-1">
              <thead>
                <tr>
                  {item.table.columns.map((c) => (
                    <th
                      key={c}
                      scope="col"
                      className="text-left font-semibold text-navy-800 border-b border-navy-100 py-2 pr-4"
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {item.table.rows.map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell, i) => (
                      <td
                        key={i}
                        className={`py-2 pr-4 border-b border-navy-50 ${
                          i === 0 ? 'text-slate-600' : 'text-navy-800 font-medium tabular-nums'
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * @param {object[]} items      entries from src/data/faq.js
 * @param {string}   className  grid classes — the caller decides 1 or 2 columns
 * @param {number}   defaultOpenIndex  -1 (default) opens nothing
 */
export default function FaqAccordion({ items, className = '', defaultOpenIndex = -1 }) {
  const [openId, setOpenId] = useState(items[defaultOpenIndex]?.id ?? null)

  if (!items.length) {
    return (
      <p className="text-sm text-slate-500 py-8 text-center">
        No questions match your search.
      </p>
    )
  }

  return (
    <div className={className}>
      {items.map((item) => (
        <FaqItem
          key={item.id}
          item={item}
          isOpen={openId === item.id}
          onToggle={() => setOpenId(openId === item.id ? null : item.id)}
        />
      ))}
    </div>
  )
}
