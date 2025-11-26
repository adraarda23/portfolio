import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import './About.css'

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

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
                I'm a dedicated software engineer with expertise in modern web technologies and
                a passion for building scalable, high-performance applications. Currently advancing
                my proficiency in TypeScript, Redux, and Node.js while exploring emerging technologies
                including quantum computing.
              </p>

              <div className="about-details">
                <div className="detail-item">
                  <span className="detail-icon">🎓</span>
                  <div>
                    <h3>Education</h3>
                    <p>Computer Engineering</p>
                    <p className="detail-sub">Bursa Technical University (2021-2026)</p>
                  </div>
                </div>

                <div className="detail-item">
                  <span className="detail-icon">💼</span>
                  <div>
                    <h3>Current Role</h3>
                    <p>Software Developer</p>
                    <p className="detail-sub">Ithinka IT and IoT Technologies</p>
                  </div>
                </div>

                <div className="detail-item">
                  <span className="detail-icon">🚀</span>
                  <div>
                    <h3>Focus Areas</h3>
                    <p>Backend Development & Scalable Systems</p>
                    <p className="detail-sub">RESTful APIs, Database Optimization</p>
                  </div>
                </div>
              </div>

              <div className="about-highlights">
                <h3>What I Do</h3>
                <ul>
                  <li>
                    <span className="highlight-icon">✨</span>
                    Architecting responsive web applications with React and Angular
                  </li>
                  <li>
                    <span className="highlight-icon">⚡</span>
                    Designing and implementing scalable backend systems
                  </li>
                  <li>
                    <span className="highlight-icon">🔧</span>
                    Database optimization and API development
                  </li>
                  <li>
                    <span className="highlight-icon">📚</span>
                    Staying current with industry best practices and emerging technologies
                  </li>
                </ul>
              </div>

              <div className="about-cta">
                <p>
                  I actively seek opportunities to collaborate with fellow developers, contribute
                  to meaningful projects, and engage in knowledge sharing within the tech community.
                  I'm particularly interested in discussing innovative solutions, software architecture,
                  and the future of technology.
                </p>
              </div>
            </motion.div>

            <motion.div className="about-stats" variants={itemVariants}>
              <div className="stat-card">
                <div className="stat-number">3+</div>
                <div className="stat-label">Years of Experience</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">10+</div>
                <div className="stat-label">Technologies</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">5+</div>
                <div className="stat-label">Projects Completed</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">400+</div>
                <div className="stat-label">Community Members Led</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
