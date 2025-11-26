import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  FaReact,
  FaAngular,
  FaNode,
  FaPython,
  FaJava,
  FaDocker,
  FaGitAlt,
  FaLinux,
  FaDatabase,
} from 'react-icons/fa'
import {
  SiTypescript,
  SiJavascript,
  SiExpress,
  SiFlask,
  SiPostgresql,
  SiMongodb,
  SiMysql,
  SiRedux,
  SiApachekafka,
  SiSpringboot,
  SiNginx,
} from 'react-icons/si'
import './Skills.css'

const Skills = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const skillCategories = [
    {
      title: 'Languages',
      icon: '💻',
      skills: [
        { name: 'JavaScript', icon: <SiJavascript />, level: 90 },
        { name: 'TypeScript', icon: <SiTypescript />, level: 85 },
        { name: 'Python', icon: <FaPython />, level: 85 },
        { name: 'Java', icon: <FaJava />, level: 80 },
        { name: 'SQL', icon: <FaDatabase />, level: 85 },
      ],
    },
    {
      title: 'Frontend',
      icon: '🎨',
      skills: [
        { name: 'React', icon: <FaReact />, level: 90 },
        { name: 'Angular', icon: <FaAngular />, level: 80 },
        { name: 'Redux', icon: <SiRedux />, level: 75 },
        { name: 'HTML/CSS', icon: '🎯', level: 90 },
      ],
    },
    {
      title: 'Backend',
      icon: '⚙️',
      skills: [
        { name: 'Node.js', icon: <FaNode />, level: 85 },
        { name: 'Express.js', icon: <SiExpress />, level: 85 },
        { name: 'Flask', icon: <SiFlask />, level: 80 },
        { name: 'Spring Boot', icon: <SiSpringboot />, level: 75 },
        { name: 'REST API', icon: '🔌', level: 90 },
      ],
    },
    {
      title: 'Databases',
      icon: '🗄️',
      skills: [
        { name: 'PostgreSQL', icon: <SiPostgresql />, level: 85 },
        { name: 'MongoDB', icon: <SiMongodb />, level: 80 },
        { name: 'MySQL', icon: <SiMysql />, level: 80 },
        { name: 'SQLite', icon: <FaDatabase />, level: 75 },
      ],
    },
    {
      title: 'DevOps & Tools',
      icon: '🛠️',
      skills: [
        { name: 'Docker', icon: <FaDocker />, level: 80 },
        { name: 'Git', icon: <FaGitAlt />, level: 90 },
        { name: 'Linux', icon: <FaLinux />, level: 80 },
        { name: 'NGINX', icon: <SiNginx />, level: 70 },
        { name: 'Apache Kafka', icon: <SiApachekafka />, level: 70 },
      ],
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const categoryVariants = {
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
    <section id="skills" className="skills" ref={ref}>
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          Skills & Technologies
        </motion.h2>

        <motion.div
          className="skills-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              className="skill-category"
              variants={categoryVariants}
            >
              <div className="category-header">
                <span className="category-icon">{category.icon}</span>
                <h3 className="category-title">{category.title}</h3>
              </div>
              <div className="skills-list">
                {category.skills.map((skill, idx) => (
                  <motion.div
                    key={idx}
                    className="skill-item"
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                    transition={{ delay: index * 0.1 + idx * 0.05 }}
                  >
                    <div className="skill-info">
                      <span className="skill-icon">{skill.icon}</span>
                      <span className="skill-name">{skill.name}</span>
                    </div>
                    <div className="skill-bar-container">
                      <motion.div
                        className="skill-bar"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{ duration: 1, delay: index * 0.1 + idx * 0.05 + 0.3 }}
                      >
                        <span className="skill-percentage">{skill.level}%</span>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
