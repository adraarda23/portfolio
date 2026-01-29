import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaPhone, FaPaperPlane } from 'react-icons/fa'
import { contactApi, socialLinksApi, emailApi } from '../services/api'
import './Contact.css'

// Icon mapping
const iconMap = {
  'FaGithub': <FaGithub />,
  'FaLinkedin': <FaLinkedin />,
  'FaEnvelope': <FaEnvelope />,
}

const getIcon = (iconClass) => iconMap[iconClass] || <FaEnvelope />

const Contact = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [contact, setContact] = useState(null)
  const [socialLinks, setSocialLinks] = useState([])
  const [loading, setLoading] = useState(true)

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [sending, setSending] = useState(false)
  const [formMessage, setFormMessage] = useState({ type: '', text: '' })

  // Fallback data
  const fallbackContact = {
    email: 'ardaaydinkilinc@gmail.com',
    phone: '+90 542 117 04 72',
    location: 'Bursa, Turkey',
    introTitle: "Let's Connect!",
    introText: "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Whether you have a question or just want to say hi, feel free to reach out!",
    ctaText: 'Ready to start a conversation?'
  }

  const fallbackSocialLinks = [
    { name: 'GitHub', icon: <FaGithub />, url: 'https://github.com/adraarda23', color: '#333' },
    { name: 'LinkedIn', icon: <FaLinkedin />, url: 'https://www.linkedin.com/in/ardaaydınkılınç/', color: '#0077b5' },
    { name: 'Email', icon: <FaEnvelope />, url: 'mailto:ardaaydinkilinc@gmail.com', color: '#ea4335' },
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [contactData, linksData] = await Promise.all([
          contactApi.get(),
          socialLinksApi.getAll()
        ])
        setContact(contactData)
        setSocialLinks(linksData.map(link => ({
          ...link,
          icon: getIcon(link.iconClass)
        })))
        setLoading(false)
      } catch (err) {
        console.error('Failed to fetch contact data:', err)
        setContact(fallbackContact)
        setSocialLinks(fallbackSocialLinks)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    setFormMessage({ type: '', text: '' })

    try {
      await emailApi.send(formData)
      setFormMessage({ type: 'success', text: '✅ Message sent successfully! I will get back to you soon.' })
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      setFormMessage({ type: 'error', text: '❌ Failed to send message. Please try again or email me directly.' })
    }
    setSending(false)
  }

  const displayContact = contact || fallbackContact
  const displaySocialLinks = socialLinks.length > 0 ? socialLinks : fallbackSocialLinks

  const contactInfo = [
    {
      icon: <FaEnvelope />,
      label: 'Email',
      value: displayContact.email,
      link: `mailto:${displayContact.email}`,
    },
    {
      icon: <FaPhone />,
      label: 'Phone',
      value: displayContact.phone,
      link: `tel:${displayContact.phone?.replace(/\s/g, '')}`,
    },
    {
      icon: <FaMapMarkerAlt />,
      label: 'Location',
      value: displayContact.location,
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
            <h3>{displayContact.introTitle}</h3>
            <p>{displayContact.introText}</p>
          </motion.div>

          <div className="contact-grid">
            {/* Contact Form */}
            <motion.div className="contact-form-section" variants={itemVariants}>
              <h3>📬 Send me a message</h3>
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="What's this about?"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Your message here..."
                    rows="5"
                    required
                  />
                </div>

                {formMessage.text && (
                  <div className={`form-message ${formMessage.type}`}>
                    {formMessage.text}
                  </div>
                )}

                <motion.button
                  type="submit"
                  className="btn btn-primary submit-btn"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={sending}
                >
                  {sending ? (
                    <>Sending...</>
                  ) : (
                    <>
                      <FaPaperPlane />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div className="contact-info-section" variants={itemVariants}>
              <h3>📍 Contact Info</h3>
              <div className="contact-info-list">
                {contactInfo.map((info, index) => (
                  <div key={index} className="contact-info-item">
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
                  </div>
                ))}
              </div>

              <div className="social-section">
                <h4>Find Me On</h4>
                <div className="social-links">
                  {displaySocialLinks.map((social, index) => (
                    <motion.a
                      key={social.id || index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link-btn"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
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
