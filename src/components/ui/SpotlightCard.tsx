import { useMotionTemplate, useMotionValue, motion } from 'framer-motion'
import type { MouseEvent, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface Props {
  children: ReactNode
  className?: string
  color?: string
}

export function SpotlightCard({ children, className, color = 'rgba(139, 92, 246, 0.18)' }: Props) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const onMouseMove = ({ currentTarget, clientX, clientY }: MouseEvent<HTMLDivElement>) => {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  const background = useMotionTemplate`radial-gradient(420px circle at ${mouseX}px ${mouseY}px, ${color}, transparent 70%)`

  return (
    <div onMouseMove={onMouseMove} className={cn('card group', className)}>
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  )
}
