const items = [
  { text: 'Admissions Open AY 26', emphasis: true },
  { text: 'UG Admission', emphasis: false },
  { text: 'PG Admission', emphasis: false },
  { text: 'UGC Approved', emphasis: false },
]

function MarqueeItems() {
  return (
    <>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-6 shrink-0">
          <span
            className={
              item.emphasis
                ? 'text-red-400 font-bold tracking-wide'
                : 'text-amber-300 font-bold tracking-wide'
            }
          >
            {item.text}
          </span>
          <span
            className="w-1 h-1 rounded-full bg-white/40"
            aria-hidden="true"
          />
        </span>
      ))}
    </>
  )
}

function MarqueeContent() {
  return (
    <>
      <MarqueeItems />
      <MarqueeItems />
      <MarqueeItems />
    </>
  )
}

export default function AnnouncementMarquee() {
  return (
    <div className="relative isolate overflow-hidden">
      <style>{`
        @keyframes crescent-marquee {
          0%   { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .crescent-marquee-track {
          display: inline-flex;
          animation: crescent-marquee 30s linear infinite;
        }
      `}</style>

      {/* Flat solid bar to match the site's header — no glass/blur */}
      <div
        className="relative py-2"
        style={{
          background: 'linear-gradient(90deg, #1e2a4a 0%, #38507e 50%, #1e2a4a 100%)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        {/* edge fade so text doesn't hard-cut at container edges */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-16 z-10"
          style={{ background: 'linear-gradient(90deg, #1e2a4a, transparent)' }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-16 z-10"
          style={{ background: 'linear-gradient(270deg, #1e2a4a, transparent)' }}
        />

        <div className="relative flex">
          <div className="flex items-center gap-6 crescent-marquee-track whitespace-nowrap text-sm">
            <MarqueeContent />
          </div>
        </div>
      </div>
    </div>
  )
}