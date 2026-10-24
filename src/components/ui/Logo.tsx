/** Brand mark: a terracotta pebble with a serif "a" and a little honey sun. Mirrors public/favicon.svg. */
export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <path
        d="M32 3c15 0 29 9 29 27 0 19-13 31-30 31C15 61 3 50 3 33 3 15 17 3 32 3Z"
        fill="#B4532F"
      />
      <circle cx="47" cy="17" r="6" fill="#EDBF59" />
      <text
        x="30"
        y="45"
        textAnchor="middle"
        fontFamily="Fraunces, Georgia, serif"
        fontSize="36"
        fontWeight="600"
        fill="#FFFCF7"
      >
        a
      </text>
    </svg>
  )
}
