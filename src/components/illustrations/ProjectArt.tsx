interface Theme {
  bg: string
  blob: string
  main: string
  accent: string
  light: string
}

const THEMES: Theme[] = [
  { bg: '#F8DCCD', blob: '#F0BBA2', main: '#B4532F', accent: '#EDBF59', light: '#FFFCF7' },
  { bg: '#DDE6D8', blob: '#BCCDB5', main: '#4F6B4C', accent: '#E5946F', light: '#FFFCF7' },
  { bg: '#FAE8BF', blob: '#F4D48A', main: '#9A6414', accent: '#C8623E', light: '#FFFCF7' },
  { bg: '#EBDCC7', blob: '#DCC7AA', main: '#54453B', accent: '#7A9771', light: '#FFFCF7' },
]

function Browser({ t, x, y, w, h }: { t: Theme; x: number; y: number; w: number; h: number }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="14" fill={t.light} />
      <rect x={x} y={y} width={w} height="26" rx="14" fill={t.main} />
      <rect x={x} y={y + 14} width={w} height="12" fill={t.main} />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={x + 16 + i * 13} cy={y + 13} r="4" fill={t.light} opacity={0.85 - i * 0.2} />
      ))}
      <rect x={x + 16} y={y + 40} width={w * 0.45} height="10" rx="5" fill={t.main} opacity="0.85" />
      <rect x={x + 16} y={y + 58} width={w * 0.3} height="8" rx="4" fill={t.blob} />
      <rect x={x + 16} y={y + 78} width={w * 0.38} height={h - 94} rx="8" fill={t.bg} />
      <rect x={x + w * 0.38 + 26} y={y + 78} width={w * 0.62 - 42} height={(h - 94) / 2 - 4} rx="8" fill={t.accent} opacity="0.7" />
      <rect x={x + w * 0.38 + 26} y={y + 78 + (h - 94) / 2 + 4} width={w * 0.62 - 42} height={(h - 94) / 2 - 4} rx="8" fill={t.blob} />
    </g>
  )
}

function Servers({ t, x, y, w }: { t: Theme; x: number; y: number; w: number }) {
  return (
    <g>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={x} y={y + i * 38} width={w} height="30" rx="10" fill={i === 1 ? t.main : t.light} />
          <circle cx={x + 16} cy={y + i * 38 + 15} r="4.5" fill={i === 1 ? t.accent : t.main} />
          <circle cx={x + 30} cy={y + i * 38 + 15} r="4.5" fill={i === 1 ? t.light : t.blob} opacity="0.9" />
          <rect x={x + w - 54} y={y + i * 38 + 12} width="38" height="6" rx="3" fill={i === 1 ? t.light : t.blob} opacity="0.8" />
        </g>
      ))}
    </g>
  )
}

function Nodes({ t }: { t: Theme }) {
  const pts: [number, number][] = [
    [70, 60],
    [120, 140],
    [200, 80],
    [290, 140],
    [340, 60],
  ]
  return (
    <g>
      <path d={`M${pts.map((p) => p.join(' ')).join(' L')}`} fill="none" stroke={t.main} strokeWidth="3" strokeDasharray="6 8" strokeLinecap="round" />
      {pts.map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r={i === 2 ? 22 : 14} fill={i === 2 ? t.main : t.light} />
          <circle cx={cx} cy={cy} r={i === 2 ? 8 : 5} fill={i === 2 ? t.accent : t.main} />
        </g>
      ))}
    </g>
  )
}

/**
 * Decorative cover for a project card. The motif follows the project's
 * category and the colour theme rotates with its position in the grid.
 */
export function ProjectArt({ index, category, className }: { index: number; category: string; className?: string }) {
  const t = THEMES[index % THEMES.length]
  const cat = category.toLowerCase()

  return (
    <svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden>
      <rect width="400" height="200" fill={t.bg} />
      <circle cx={index % 2 ? 60 : 340} cy="40" r="90" fill={t.blob} opacity="0.7" />
      <circle cx={index % 2 ? 360 : 40} cy="200" r="60" fill={t.light} opacity="0.35" />
      <path d="M352 150l4 10 10 4-10 4-4 10-4-10-10-4 10-4Z" fill={t.accent} />
      <path d="M44 34l3 7 7 3-7 3-3 7-3-7-7-3 7-3Z" fill={t.main} opacity="0.6" />

      {cat.includes('full') ? (
        <>
          <Browser t={t} x={70} y={34} w={190} h={136} />
          <Servers t={t} x={238} y={70} w={112} />
        </>
      ) : cat.includes('front') ? (
        <Browser t={t} x={90} y={30} w={220} h={150} />
      ) : cat.includes('back') && index % 2 === 0 ? (
        <g transform="translate(0 10)">
          <Nodes t={t} />
        </g>
      ) : (
        <Servers t={t} x={130} y={44} w={140} />
      )}
    </svg>
  )
}
