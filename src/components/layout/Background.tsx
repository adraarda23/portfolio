export function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-cream-100" />
      <div className="absolute -left-32 -top-40 h-[28rem] w-[28rem] rounded-full bg-clay-100/80 blur-[110px] animate-blob sm:h-[36rem] sm:w-[36rem]" />
      <div
        className="absolute -right-40 top-1/4 h-[26rem] w-[26rem] rounded-full bg-honey-100/80 blur-[120px] animate-blob sm:h-[32rem] sm:w-[32rem]"
        style={{ animationDelay: '-8s' }}
      />
      <div
        className="absolute -bottom-32 left-1/4 h-[24rem] w-[24rem] rounded-full bg-sage-100/70 blur-[120px] animate-blob"
        style={{ animationDelay: '-15s' }}
      />
    </div>
  )
}
