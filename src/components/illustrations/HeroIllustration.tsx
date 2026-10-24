/**
 * Cozy desk scene drawn in the site palette: an arched window with sunset
 * hills, a laptop with code, a steaming mug and a plant.
 */
export function HeroIllustration({ className }: { className?: string }) {
  const steam = 'animate-steam [transform-box:fill-box] [transform-origin:bottom]'
  return (
    <svg viewBox="0 0 480 440" className={className} role="img" aria-label="Illustration of a cozy developer desk">
      <defs>
        <clipPath id="hero-arch">
          <path d="M70 400V210a170 170 0 0 1 340 0v190Z" />
        </clipPath>
        <linearGradient id="hero-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F8DCCD" />
          <stop offset="1" stopColor="#FAE8BF" />
        </linearGradient>
      </defs>

      {/* window */}
      <g clipPath="url(#hero-arch)">
        <rect x="60" y="30" width="360" height="380" fill="url(#hero-sky)" />
        <circle cx="300" cy="190" r="52" fill="#EDBF59" />
        <circle cx="300" cy="190" r="72" fill="#EDBF59" opacity="0.25" />
        <path d="M70 320c60-48 120-40 190-6s110 20 150-6v92H70Z" fill="#BCCDB5" />
        <path d="M70 350c70-30 140-26 200 0s100 12 140-10v60H70Z" fill="#97B08E" />
      </g>
      <path d="M70 400V210a170 170 0 0 1 340 0v190" fill="none" stroke="#EBDCC7" strokeWidth="10" />
      <path d="M240 40v360M70 270h340" stroke="#EBDCC7" strokeWidth="6" opacity="0.9" />

      {/* sparkles */}
      <path d="M110 120l5 13 13 5-13 5-5 13-5-13-13-5 13-5Z" fill="#E3A33B" />
      <path d="M440 90l4 9 9 4-9 4-4 9-4-9-9-4 9-4Z" fill="#D8774F" />
      <path d="M38 230l3 7 7 3-7 3-3 7-3-7-7-3 7-3Z" fill="#7A9771" />

      {/* desk */}
      <rect x="20" y="396" width="440" height="16" rx="8" fill="#3D312A" />
      <rect x="40" y="412" width="12" height="24" rx="4" fill="#54453B" />
      <rect x="428" y="412" width="12" height="24" rx="4" fill="#54453B" />

      {/* plant */}
      <path d="M64 358C46 334 44 306 58 284c12 22 14 48 6 74Z" fill="#6A8763" />
      <path d="M64 358c-22-12-36-32-36-58 22 8 34 30 36 58Z" fill="#7A9771" />
      <path d="M64 358c4-26 18-44 40-52-2 26-16 44-40 52Z" fill="#5E7A5A" />
      <path d="M40 356h48l-6 40H46Z" fill="#E3A33B" />
      <rect x="36" y="350" width="56" height="10" rx="5" fill="#CF8A26" />

      {/* laptop */}
      <rect x="124" y="244" width="212" height="142" rx="14" fill="#2B201A" />
      <rect x="136" y="256" width="188" height="118" rx="7" fill="#3D312A" />
      <g strokeLinecap="round" strokeWidth="7">
        <path d="M154 280h40" stroke="#E5946F" />
        <path d="M204 280h70" stroke="#EBDCC7" opacity="0.7" />
        <path d="M170 302h56" stroke="#EDBF59" />
        <path d="M236 302h40" stroke="#97B08E" />
        <path d="M170 324h84" stroke="#EBDCC7" opacity="0.7" />
        <path d="M154 346h30" stroke="#E5946F" />
      </g>
      <path d="M296 340c-6-6-14-4-14 4 0 7 14 14 14 14s14-7 14-14c0-8-8-10-14-4Z" fill="#D8774F" />
      <path d="M100 386h260l12 10H88Z" fill="#54453B" />
      <rect x="208" y="388" width="44" height="4" rx="2" fill="#3D312A" />

      {/* speech bubble */}
      <g>
        <rect x="150" y="186" width="74" height="40" rx="20" fill="#FFFCF7" stroke="#EBDCC7" strokeWidth="2" />
        <path d="M170 224l-6 14 18-12Z" fill="#FFFCF7" />
        <text x="187" y="213" textAnchor="middle" fontFamily="Fraunces, Georgia, serif" fontSize="20" fontWeight="600" fill="#B4532F">
          hi!
        </text>
      </g>

      {/* mug */}
      <path d="M408 360a12 12 0 0 1 0 24" fill="none" stroke="#C8623E" strokeWidth="7" />
      <rect x="366" y="350" width="44" height="46" rx="10" fill="#C8623E" />
      <path d="M376 366h24" stroke="#F8DCCD" strokeWidth="4" strokeLinecap="round" />
      <g fill="none" stroke="#CBB9A8" strokeWidth="3.5" strokeLinecap="round">
        <path className={steam} d="M378 338c-6-7 0-12 0-18" />
        <path className={steam} style={{ animationDelay: '-1s' }} d="M388 336c-6-7 0-12 0-20" />
        <path className={steam} style={{ animationDelay: '-2s' }} d="M398 338c-6-7 0-12 0-18" />
      </g>
    </svg>
  )
}
