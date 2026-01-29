import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import { profileApi } from '../services/api'
import './Hero.css'

const Hero = () => {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  // Fallback data
  const fallbackProfile = {
    name: 'Arda Aydın Kılınç',
    title: 'Backend Developer',
    subtitle: "👋 Hello, I'm",
    description: 'Passionate software engineer specializing in backend development and scalable systems. Building robust applications with modern technologies.',
    githubUrl: 'https://github.com/adraarda23',
    linkedinUrl: 'https://www.linkedin.com/in/ardaaydınkılınç/',
    email: 'ardaaydinkilinc@gmail.com'
  }

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await profileApi.get()
        setProfile(data)
        setLoading(false)
      } catch (err) {
        console.error('Failed to fetch profile:', err)
        setProfile(fallbackProfile)
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  const displayProfile = profile || fallbackProfile

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  const handleScrollToContact = (e) => {
    e.preventDefault()
    const element = document.querySelector('#contact')
    if (element) {
      const offset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section id="hero" className="hero">
      <div className="container">
        <motion.div
          className="hero-content"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div className="hero-label" variants={item}>
            <span>{displayProfile.subtitle}</span>
          </motion.div>

          <motion.h1 className="hero-title" variants={item}>
            {displayProfile.name}
          </motion.h1>

          <motion.h2 className="hero-subtitle" variants={item}>
            {displayProfile.title}
          </motion.h2>

          <motion.p className="hero-description" variants={item}>
            {displayProfile.description}
          </motion.p>

          <motion.div className="hero-buttons" variants={item}>
            <motion.a
              href="#contact"
              onClick={handleScrollToContact}
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.a>
            <motion.a
              href={displayProfile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View GitHub
            </motion.a>
          </motion.div>

          <motion.div className="hero-social" variants={item}>
            <motion.a
              href={displayProfile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaGithub />
            </motion.a>
            <motion.a
              href={displayProfile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              whileHover={{ scale: 1.2, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaLinkedin />
            </motion.a>
            <motion.a
              href={`mailto:${displayProfile.email}`}
              className="social-link"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaEnvelope />
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="visual-circle"></div>
          <div className="visual-circle-2"></div>
          <div className="visual-circle-3"></div>
        </motion.div>
      </div>

      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          delay: 1.5,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      >
        <div className="mouse"></div>
      </motion.div>
    </section>
  )
}

export default Hero
