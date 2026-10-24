export function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-ink-950" />
      <div className="absolute inset-0 bg-grid-dots [background-size:28px_28px] opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div className="absolute -left-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-accent/25 blur-[140px] animate-blob" />
      <div
        className="absolute -right-40 top-1/3 h-[30rem] w-[30rem] rounded-full bg-accent-cyan/20 blur-[140px] animate-blob"
        style={{ animationDelay: '-6s' }}
      />
      <div
        className="absolute bottom-0 left-1/3 h-[26rem] w-[26rem] rounded-full bg-accent-pink/15 blur-[140px] animate-blob"
        style={{ animationDelay: '-12s' }}
      />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </div>
  )
}
