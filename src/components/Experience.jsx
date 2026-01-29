import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { experiencesApi } from '../services/api'
import './Experience.css'

const Experience = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [experiences, setExperiences] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fallback data
  const fallbackExperiences = [
    {
      title: 'Software Developer',
      company: 'Ithinka IT and IoT Technologies',
      type: 'Internship',
      location: 'Türkiye · On-site',
      period: 'Sep 2025 - Present',
      duration: '3 months',
      description: 'Working on IoT and software development projects, contributing to modern web applications.',
      technologies: ['JavaScript', 'Node.js', 'IoT'],
    },
    {
      title: 'Software Developer',
      company: 'EPİAŞ (Energy Exchange Istanbul)',
      type: 'Internship',
      location: 'İstanbul, Türkiye · On-site',
      period: 'Aug 2025 - Sep 2025',
      duration: '2 months',
      description: 'Developed enterprise-level applications using Spring Boot and Apache Kafka for energy trading systems.',
      technologies: ['Spring Boot', 'Apache Kafka', 'Java'],
    },
    {
      title: 'Full-Stack Developer',
      company: 'Uludag Project - Medical Imaging',
      type: 'Scholarship',
      location: 'Bursa, Türkiye · Remote',
      period: 'Jun 2024 - Jun 2025',
      duration: '1 year',
      description: 'Built medical imaging platform with Flask RESTful API and Angular frontend. Implemented Agile methodology in team collaboration.',
      technologies: ['Angular', 'Flask', 'Python', 'REST API'],
    },
    {
      title: 'Community Lead',
      company: 'BTU Computer Science Society',
      type: 'Leadership',
      location: 'Bursa, Türkiye',
      period: 'Oct 2024 - Jul 2025',
      duration: '10 months',
      description: 'Led a community of 400+ members, organized workshops, seminars, and hackathons. Coordinated technical events and fostered collaboration.',
      technologies: ['Leadership', 'Event Management', 'Community Building'],
    },
    {
      title: 'Co-Lead',
      company: 'BTU Computer Science Society',
      type: 'Leadership',
      location: 'Bursa, Türkiye',
      period: 'Oct 2023 - Oct 2024',
      duration: '1 year',
      description: 'Assisted in community management and event organization. Helped grow the community and establish technical programs.',
      technologies: ['Team Coordination', 'Event Planning'],
    },
  ]

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const data = await experiencesApi.getAll()
        setExperiences(data)
        setLoading(false)
      } catch (err) {
        console.error('Failed to fetch experiences:', err)
        setExperiences(fallbackExperiences)
        setError(err.message)
        setLoading(false)
      }
    }

    fetchExperiences()
  }, [])

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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  const displayExperiences = experiences.length > 0 ? experiences : fallbackExperiences

  return (
    <section id="experience" className="experience" ref={ref}>
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          Experience
        </motion.h2>

        <motion.div
          className="timeline"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {displayExperiences.map((exp, index) => (
            <motion.div
              key={exp.id || index}
              className="timeline-item"
              variants={itemVariants}
            >
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <div>
                    <h3 className="timeline-title">{exp.title}</h3>
                    <p className="timeline-company">{exp.company}</p>
                  </div>
                  <span className="timeline-type">{exp.type}</span>
                </div>
                <div className="timeline-meta">
                  <span className="timeline-period">{exp.period}</span>
                  <span className="timeline-duration">{exp.duration}</span>
                  <span className="timeline-location">{exp.location}</span>
                </div>
                <p className="timeline-description">{exp.description}</p>
                <div className="timeline-technologies">
                  {(Array.isArray(exp.technologies) ? exp.technologies : []).map((tech, idx) => (
                    <span key={idx} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Experience
