import type { PortfolioData } from '@/lib/types'

/**
 * Snapshot of the live content. Used when the API is unreachable so the site
 * never renders empty, and as seed data for local development.
 */
export const fallbackData: PortfolioData = {
  profile: {
    id: 1,
    name: 'Arda Aydın Kılınç',
    title: 'Backend Developer',
    subtitle: "Hello, I'm",
    description:
      'Passionate software engineer specializing in backend development and scalable systems. Building robust applications with modern technologies.',
    githubUrl: 'https://github.com/adraarda23',
    linkedinUrl: 'https://www.linkedin.com/in/ardaaydınkılınç/',
    email: 'ardaaydinkilinc@gmail.com',
  },
  about: {
    id: 1,
    intro:
      "I'm a dedicated software engineer with expertise in modern web technologies and a passion for building scalable, high-performance applications. Currently advancing my proficiency in TypeScript, Redux, and Node.js while exploring emerging technologies including quantum computing.",
    educationTitle: 'Computer Engineering',
    educationDetail: 'Bursa Technical University (2021-2026)',
    educationPeriod: '2021-2026',
    currentRole: 'Software Developer',
    currentCompany: 'Ithinka IT and IoT Technologies',
    focusTitle: 'Backend Development & Scalable Systems',
    focusDetail: 'RESTful APIs, Database Optimization',
    whatIDo: [
      'Architecting responsive web applications with React and Angular',
      'Designing and implementing scalable backend systems',
      'Database optimization and API development',
      'Staying current with industry best practices and emerging technologies',
    ],
    ctaText:
      "I actively seek opportunities to collaborate with fellow developers, contribute to meaningful projects, and engage in knowledge sharing within the tech community. I'm particularly interested in discussing innovative solutions, software architecture, and the future of technology.",
  },
  stats: [
    { id: 1, number: '3+', label: 'Years of Experience', displayOrder: 1 },
    { id: 2, number: '10+', label: 'Technologies', displayOrder: 2 },
    { id: 3, number: '5+', label: 'Projects Completed', displayOrder: 3 },
    { id: 4, number: '400+', label: 'Community Members Led', displayOrder: 4 },
  ],
  experiences: [
    {
      id: 1,
      title: 'Software Developer',
      company: 'Ithinka IT and IoT Technologies',
      type: 'Internship',
      location: 'Türkiye · On-site',
      period: 'Sep 2025 - Present',
      duration: '6 months',
      description: 'Working on IoT and software development projects, contributing to modern web applications.',
      technologies: ['.Net Core', 'Angular', 'Docker'],
      displayOrder: 1,
    },
    {
      id: 2,
      title: 'Software Developer',
      company: 'EPİAŞ (Energy Exchange Istanbul)',
      type: 'Internship',
      location: 'İstanbul, Türkiye · On-site',
      period: 'Aug 2025 - Sep 2025',
      duration: '2 months',
      description:
        'Developed enterprise-level applications using Spring Boot and Apache Kafka for energy trading systems.',
      technologies: ['Spring Boot', 'Apache Kafka', 'Java'],
      displayOrder: 2,
    },
    {
      id: 3,
      title: 'Full-Stack Developer',
      company: 'Uludag Project - Medical Imaging',
      type: 'Scholarship',
      location: 'Bursa, Türkiye · Remote',
      period: 'Jun 2024 - Jun 2025',
      duration: '1 year',
      description:
        'Built medical imaging platform with Flask RESTful API and Angular frontend. Implemented Agile methodology in team collaboration.',
      technologies: ['Angular', 'Flask', 'Python', 'REST API'],
      displayOrder: 3,
    },
    {
      id: 4,
      title: 'Community Lead',
      company: 'BTU Computer Science Society',
      type: 'Leadership',
      location: 'Bursa, Türkiye',
      period: 'Oct 2024 - Jul 2025',
      duration: '10 months',
      description:
        'Led a community of 400+ members, organized workshops, seminars, and hackathons. Coordinated technical events and fostered collaboration.',
      technologies: ['Leadership', 'Event Management', 'Community Building'],
      displayOrder: 4,
    },
    {
      id: 5,
      title: 'Co-Lead',
      company: 'BTU Computer Science Society',
      type: 'Leadership',
      location: 'Bursa, Türkiye',
      period: 'Oct 2023 - Oct 2024',
      duration: '1 year',
      description:
        'Assisted in community management and event organization. Helped grow the community and establish technical programs.',
      technologies: ['Team Coordination', 'Event Planning'],
      displayOrder: 5,
    },
  ],
  skillCategories: [
    {
      id: 1,
      title: 'Languages',
      icon: '💻',
      displayOrder: 1,
      skills: [
        { id: 1, name: 'JavaScript', iconClass: 'SiJavascript', level: 60, displayOrder: 1, skillCategoryId: 1 },
        { id: 2, name: 'TypeScript', iconClass: 'SiTypescript', level: 60, displayOrder: 2, skillCategoryId: 1 },
        { id: 3, name: 'Python', iconClass: 'FaPython', level: 75, displayOrder: 3, skillCategoryId: 1 },
        { id: 4, name: 'Java', iconClass: 'FaJava', level: 90, displayOrder: 4, skillCategoryId: 1 },
        { id: 5, name: 'SQL', iconClass: 'FaDatabase', level: 90, displayOrder: 5, skillCategoryId: 1 },
      ],
    },
    {
      id: 2,
      title: 'Frontend',
      icon: '🎨',
      displayOrder: 2,
      skills: [
        { id: 6, name: 'React', iconClass: 'FaReact', level: 60, displayOrder: 1, skillCategoryId: 2 },
        { id: 7, name: 'Angular', iconClass: 'FaAngular', level: 60, displayOrder: 2, skillCategoryId: 2 },
        { id: 8, name: 'Redux', iconClass: 'SiRedux', level: 40, displayOrder: 3, skillCategoryId: 2 },
        { id: 9, name: 'HTML/CSS', iconClass: 'HtmlCss', level: 90, displayOrder: 4, skillCategoryId: 2 },
      ],
    },
    {
      id: 3,
      title: 'Backend',
      icon: '⚙️',
      displayOrder: 3,
      skills: [
        { id: 10, name: 'Node.js', iconClass: 'FaNode', level: 80, displayOrder: 1, skillCategoryId: 3 },
        { id: 11, name: 'Express.js', iconClass: 'SiExpress', level: 85, displayOrder: 2, skillCategoryId: 3 },
        { id: 12, name: 'Flask', iconClass: 'SiFlask', level: 85, displayOrder: 3, skillCategoryId: 3 },
        { id: 13, name: 'Spring Boot', iconClass: 'SiSpringboot', level: 90, displayOrder: 4, skillCategoryId: 3 },
        { id: 14, name: 'REST API', iconClass: 'RestApi', level: 85, displayOrder: 5, skillCategoryId: 3 },
      ],
    },
    {
      id: 4,
      title: 'Databases',
      icon: '🗄️',
      displayOrder: 4,
      skills: [
        { id: 15, name: 'PostgreSQL', iconClass: 'SiPostgresql', level: 90, displayOrder: 1, skillCategoryId: 4 },
        { id: 16, name: 'MongoDB', iconClass: 'SiMongodb', level: 75, displayOrder: 2, skillCategoryId: 4 },
        { id: 17, name: 'MySQL', iconClass: 'SiMysql', level: 75, displayOrder: 3, skillCategoryId: 4 },
        { id: 18, name: 'SQLite', iconClass: 'FaDatabase', level: 60, displayOrder: 4, skillCategoryId: 4 },
      ],
    },
    {
      id: 5,
      title: 'DevOps & Tools',
      icon: '🛠️',
      displayOrder: 5,
      skills: [
        { id: 19, name: 'Docker', iconClass: 'FaDocker', level: 80, displayOrder: 1, skillCategoryId: 5 },
        { id: 20, name: 'Git', iconClass: 'FaGitAlt', level: 90, displayOrder: 2, skillCategoryId: 5 },
        { id: 21, name: 'Linux', iconClass: 'FaLinux', level: 80, displayOrder: 3, skillCategoryId: 5 },
      ],
    },
  ],
  projects: [
    {
      id: 1,
      title: 'Medical Imaging Platform',
      description:
        'A comprehensive medical imaging platform built with Angular and Flask. Features include image processing, RESTful API integration, and real-time data visualization for medical professionals.',
      technologies: ['Angular', 'Flask', 'Python', 'REST API', 'TypeScript'],
      category: 'Full-Stack',
      year: '2024-2025',
      githubUrl: null,
      demoUrl: null,
      displayOrder: 1,
    },
    {
      id: 2,
      title: 'React Portfolio Website',
      description:
        'Modern and responsive portfolio website built with React and Framer Motion. Features smooth animations, component-based architecture, and optimized performance.',
      technologies: ['React', 'Framer Motion', 'CSS3', 'JavaScript'],
      category: 'Frontend',
      year: '2023',
      githubUrl: 'https://github.com/adraarda23',
      demoUrl: null,
      displayOrder: 2,
    },
    {
      id: 3,
      title: 'Hafize Ana - University Food Bot',
      description:
        'Multi-platform bot for Discord and Telegram that provides daily university cafeteria menus. Automated menu updates and notifications for students.',
      technologies: ['Python', 'Discord API', 'Telegram API', 'Web Scraping'],
      category: 'Backend',
      year: '2022',
      githubUrl: 'https://github.com/adraarda23',
      demoUrl: null,
      displayOrder: 3,
    },
    {
      id: 4,
      title: 'Energy Trading System',
      description:
        'Enterprise-level application for energy trading operations using Spring Boot and Apache Kafka. Implemented real-time data processing and event-driven architecture.',
      technologies: ['Spring Boot', 'Apache Kafka', 'Java', 'Microservices'],
      category: 'Backend',
      year: '2025',
      githubUrl: null,
      demoUrl: null,
      displayOrder: 4,
    },
  ],
  contact: {
    id: 1,
    email: 'ardaaydinkilinc@gmail.com',
    phone: '+90 542 117 04 72',
    location: 'Bursa, Turkey',
    introTitle: "Let's Connect!",
    introText:
      "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Whether you have a question or just want to say hi, feel free to reach out!",
    ctaText: 'Ready to start a conversation?',
  },
  socialLinks: [
    { id: 1, name: 'GitHub', iconClass: 'FaGithub', url: 'https://github.com/adraarda23', color: '#333', displayOrder: 1 },
    {
      id: 2,
      name: 'LinkedIn',
      iconClass: 'FaLinkedin',
      url: 'https://www.linkedin.com/in/ardaaydınkılınç/',
      color: '#0077b5',
      displayOrder: 2,
    },
    { id: 3, name: 'Email', iconClass: 'FaEnvelope', url: 'mailto:ardaaydinkilinc@gmail.com', color: '#ea4335', displayOrder: 3 },
  ],
}
