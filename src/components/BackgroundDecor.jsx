// Fixed, non-interactive decorative layer sitting behind the whole app:
// soft gradient wash + blurred colour blobs + a faint noise texture.
// This is purely visual — it does not affect layout, routing, or content.
export default function BackgroundDecor() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 overflow-hidden bg-noise bg-gradient-to-br from-[#eef3fc] via-white to-[#fdf6ec]"
    >
      <div className="blob w-[520px] h-[520px] -top-40 -left-40 bg-navy-400/30 animate-float-slow" />
      <div className="blob w-[420px] h-[420px] top-1/3 -right-32 bg-gold/25 animate-float" />
      <div className="blob w-[460px] h-[460px] bottom-[-140px] left-1/4 bg-navy-300/25 animate-float-slow" />
      <div className="blob w-[300px] h-[300px] top-[60%] right-1/4 bg-emerald-300/15 animate-float" />
    </div>
  )
}