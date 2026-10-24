import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

const variants: Variants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(6px)' },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  }),
}

interface RevealProps {
  children: ReactNode
  delay?: number
  className?: string
  once?: boolean
  as?: 'div' | 'section' | 'li' | 'span'
}

export function Reveal({ children, delay = 0, className, once = true, as = 'div' }: RevealProps) {
  const Cmp = motion[as]
  return (
    <Cmp
      className={className}
      variants={variants}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-80px' }}
    >
      {children}
    </Cmp>
  )
}
