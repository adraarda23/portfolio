import { animate, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

/** Animates "400+" / "3+" / "10k" style strings by counting the numeric part. */
export function Counter({ value, duration = 1.6 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const match = value.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/)
  const [display, setDisplay] = useState(match ? `${match[1]}0${match[3]}` : value)

  useEffect(() => {
    if (!inView || !match) return
    const target = parseFloat(match[2])
    const decimals = match[2].includes('.') ? match[2].split('.')[1].length : 0
    const controls = animate(0, target, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(`${match[1]}${v.toFixed(decimals)}${match[3]}`),
    })
    return () => controls.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, value])

  return <span ref={ref}>{display}</span>
}
