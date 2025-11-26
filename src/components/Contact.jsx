import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa'
import './Contact.css'

const Contact = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const contactInfo = [
    {
      icon: <FaEnvelope />,
      label: 'Email',
      value: 'ardaaydinkilinc@gmail.com',
      link: 'mailto:ardaaydinkilinc@gmail.com',
    },
    {
      icon: <FaPhone />,
      label: 'Phone',
      value: '+90 542 117 04 72',
      link: 'tel:+905421170472',
    },
    {
      icon: <FaMapMarkerAlt />,
      label: 'Location',
      value: 'Bursa, Turkey',
    },
  ]

  const socialLinks = [
    {
      name: 'GitHub',
      icon: <FaGithub />,
      link: 'https://github.com/adraarda23',
      color: '#333',
    },
    {
      name: 'LinkedIn',
      icon: <FaLinkedin />,
      link: 'https://www.linkedin.com/in/ardaaydınkılınç/',
      color: '#0077b5',
    },
    {
      name: 'Email',
      icon: <FaEnvelope />,
      link: 'mailto:ardaaydinkilinc@gmail.com',
      color: '#ea4335',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section id="contact" className="contact" ref={ref}>
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          Get In Touch
        </motion.h2>

        <motion.div
          className="contact-content"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.div className="contact-intro" variants={itemVariants}>
            <h3>Let's Connect!</h3>
            <p>
              I'm always open to discussing new projects, creative ideas, or opportunities
              to be part of your vision. Whether you have a question or just want to say hi,
              feel free to reach out!
            </p>
          </motion.div>

          <motion.div className="contact-info-grid" variants={itemVariants}>
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                className="contact-info-card"
                whileHover={{ y: -5 }}
              >
                {info.link ? (
                  <a href={info.link} className="info-link">
                    <span className="info-icon">{info.icon}</span>
                    <div className="info-text">
                      <span className="info-label">{info.label}</span>
                      <span className="info-value">{info.value}</span>
                    </div>
                  </a>
                ) : (
                  <div className="info-content">
                    <span className="info-icon">{info.icon}</span>
                    <div className="info-text">
                      <span className="info-label">{info.label}</span>
                      <span className="info-value">{info.value}</span>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>

          <motion.div className="social-section" variants={itemVariants}>
            <h3>Find Me On</h3>
            <div className="social-links">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-card"
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="social-icon">{social.icon}</span>
                  <span className="social-name">{social.name}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div className="contact-cta" variants={itemVariants}>
            <p>Ready to start a conversation?</p>
            <motion.a
              href="mailto:ardaaydinkilinc@gmail.com"
              className="btn btn-primary btn-large"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaEnvelope />
              <span>Send Me an Email</span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <p>&copy; 2025 Arda Aydın Kılınç. All rights reserved.</p>
            <p className="footer-tagline">Built with React & Framer Motion</p>
          </div>
        </div>
      </footer>
    </section>
  )
}

export default Contact
