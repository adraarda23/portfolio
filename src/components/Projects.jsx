import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import './Projects.css'

const Projects = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const projects = [
    {
      title: 'Medical Imaging Platform',
      description:
        'A comprehensive medical imaging platform built with Angular and Flask. Features include image processing, RESTful API integration, and real-time data visualization for medical professionals.',
      technologies: ['Angular', 'Flask', 'Python', 'REST API', 'TypeScript'],
      category: 'Full-Stack',
      year: '2024-2025',
    },
    {
      title: 'React Portfolio Website',
      description:
        'Modern and responsive portfolio website built with React and Framer Motion. Features smooth animations, component-based architecture, and optimized performance.',
      technologies: ['React', 'Framer Motion', 'CSS3', 'JavaScript'],
      github: 'https://github.com/adraarda23',
      category: 'Frontend',
      year: '2023',
    },
    {
      title: 'Hafize Ana - University Food Bot',
      description:
        'Multi-platform bot for Discord and Telegram that provides daily university cafeteria menus. Automated menu updates and notifications for students.',
      technologies: ['Python', 'Discord API', 'Telegram API', 'Web Scraping'],
      github: 'https://github.com/adraarda23',
      category: 'Backend',
      year: '2022',
    },
    {
      title: 'Energy Trading System',
      description:
        'Enterprise-level application for energy trading operations using Spring Boot and Apache Kafka. Implemented real-time data processing and event-driven architecture.',
      technologies: ['Spring Boot', 'Apache Kafka', 'Java', 'Microservices'],
      category: 'Backend',
      year: '2025',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section id="projects" className="projects" ref={ref}>
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          Featured Projects
        </motion.h2>

        <motion.div
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="project-card"
              variants={cardVariants}
              whileHover={{ y: -10 }}
            >
              <div className="project-header">
                <div className="project-category-badge">{project.category}</div>
                <div className="project-year">{project.year}</div>
              </div>

              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>

              <div className="project-technologies">
                {project.technologies.map((tech, idx) => (
                  <span key={idx} className="tech-badge">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="project-links">
                {project.github && (
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaGithub />
                    <span>Code</span>
                  </motion.a>
                )}
                {project.demo && (
                  <motion.a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaExternalLinkAlt />
                    <span>Live Demo</span>
                  </motion.a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="projects-cta"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <p>Want to see more of my work?</p>
          <motion.a
            href="https://github.com/adraarda23"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaGithub />
            <span>View All Projects on GitHub</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
