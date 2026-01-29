import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { aboutApi, statsApi } from '../services/api'
import './About.css'

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [about, setAbout] = useState(null)
  const [stats, setStats] = useState([])
  const [loading, setLoading] = useState(true)

  // Fallback data
  const fallbackAbout = {
    intro: "I'm a dedicated software engineer with expertise in modern web technologies and a passion for building scalable, high-performance applications. Currently advancing my proficiency in TypeScript, Redux, and Node.js while exploring emerging technologies including quantum computing.",
    educationTitle: 'Computer Engineering',
    educationDetail: 'Bursa Technical University (2021-2026)',
    currentRole: 'Software Developer',
    currentCompany: 'Ithinka IT and IoT Technologies',
    focusTitle: 'Backend Development & Scalable Systems',
    focusDetail: 'RESTful APIs, Database Optimization',
    whatIDo: [
      'Architecting responsive web applications with React and Angular',
      'Designing and implementing scalable backend systems',
      'Database optimization and API development',
      'Staying current with industry best practices and emerging technologies'
    ],
    ctaText: "I actively seek opportunities to collaborate with fellow developers, contribute to meaningful projects, and engage in knowledge sharing within the tech community. I'm particularly interested in discussing innovative solutions, software architecture, and the future of technology."
  }

  const fallbackStats = [
    { number: '3+', label: 'Years of Experience' },
    { number: '10+', label: 'Technologies' },
    { number: '5+', label: 'Projects Completed' },
    { number: '400+', label: 'Community Members Led' }
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [aboutData, statsData] = await Promise.all([
          aboutApi.get(),
          statsApi.getAll()
        ])
        setAbout(aboutData)
        setStats(statsData)
        setLoading(false)
      } catch (err) {
        console.error('Failed to fetch about data:', err)
        setAbout(fallbackAbout)
        setStats(fallbackStats)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const displayAbout = about || fallbackAbout
  const displayStats = stats.length > 0 ? stats : fallbackStats
  const whatIDo = Array.isArray(displayAbout.whatIDo) ? displayAbout.whatIDo : fallbackAbout.whatIDo

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <section id="about" className="about" ref={ref}>
      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.h2 className="section-title" variants={itemVariants}>
            About Me
          </motion.h2>

          <div className="about-content">
            <motion.div className="about-text" variants={itemVariants}>
              <p className="about-intro">
                {displayAbout.intro}
              </p>

              <div className="about-details">
                <div className="detail-item">
                  <span className="detail-icon">🎓</span>
                  <div>
                    <h3>Education</h3>
                    <p>{displayAbout.educationTitle}</p>
                    <p className="detail-sub">{displayAbout.educationDetail}</p>
                  </div>
                </div>

                <div className="detail-item">
                  <span className="detail-icon">💼</span>
                  <div>
                    <h3>Current Role</h3>
                    <p>{displayAbout.currentRole}</p>
                    <p className="detail-sub">{displayAbout.currentCompany}</p>
                  </div>
                </div>

                <div className="detail-item">
                  <span className="detail-icon">🚀</span>
                  <div>
                    <h3>Focus Areas</h3>
                    <p>{displayAbout.focusTitle}</p>
                    <p className="detail-sub">{displayAbout.focusDetail}</p>
                  </div>
                </div>
              </div>

              <div className="about-highlights">
                <h3>What I Do</h3>
                <ul>
                  {whatIDo.map((item, index) => (
                    <li key={index}>
                      <span className="highlight-icon">✨</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="about-cta">
                <p>{displayAbout.ctaText}</p>
              </div>
            </motion.div>

            <motion.div className="about-stats" variants={itemVariants}>
              {displayStats.map((stat, index) => (
                <div className="stat-card" key={stat.id || index}>
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
