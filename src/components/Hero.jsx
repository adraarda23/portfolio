import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import './Hero.css'

const Hero = () => {
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
            <span>👋 Hello, I'm</span>
          </motion.div>

          <motion.h1 className="hero-title" variants={item}>
            Arda Aydın Kılınç
          </motion.h1>

          <motion.h2 className="hero-subtitle" variants={item}>
            Backend Developer
          </motion.h2>

          <motion.p className="hero-description" variants={item}>
            Passionate software engineer specializing in backend development and scalable systems.
            Building robust applications with modern technologies.
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
              href="https://github.com/adraarda23"
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
              href="https://github.com/adraarda23"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaGithub />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/ardaaydınkılınç/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              whileHover={{ scale: 1.2, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaLinkedin />
            </motion.a>
            <motion.a
              href="mailto:ardaaydinkilinc@gmail.com"
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
