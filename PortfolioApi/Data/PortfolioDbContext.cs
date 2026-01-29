using Microsoft.EntityFrameworkCore;
using PortfolioApi.Entities;

namespace PortfolioApi.Data;

public class PortfolioDbContext : DbContext
{
    public PortfolioDbContext(DbContextOptions<PortfolioDbContext> options) : base(options) { }

    public DbSet<Profile> Profiles { get; set; }
    public DbSet<About> Abouts { get; set; }
    public DbSet<Stat> Stats { get; set; }
    public DbSet<Experience> Experiences { get; set; }
    public DbSet<SkillCategory> SkillCategories { get; set; }
    public DbSet<Skill> Skills { get; set; }
    public DbSet<Project> Projects { get; set; }
    public DbSet<Contact> Contacts { get; set; }
    public DbSet<SocialLink> SocialLinks { get; set; }
    public DbSet<Admin> Admins { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // NOTE: Admin user should be created manually or via API after deployment
        // Do NOT commit real passwords to git!
        // Default admin: username=ardaadmin, change password immediately after first login
        modelBuilder.Entity<Admin>().HasData(new Admin
        {
            Id = 1,
            Username = "ardaadmin",
            PasswordHash = BCrypt.Net.BCrypt.HashPassword("CHANGE_ME_IMMEDIATELY_" + Guid.NewGuid().ToString().Substring(0, 8))
        });

        // Seed default profile
        modelBuilder.Entity<Profile>().HasData(new Profile
        {
            Id = 1,
            Name = "Arda Aydın Kılınç",
            Title = "Backend Developer",
            Subtitle = "👋 Hello, I'm",
            Description = "Passionate software engineer specializing in backend development and scalable systems. Building robust applications with modern technologies.",
            GithubUrl = "https://github.com/adraarda23",
            LinkedinUrl = "https://www.linkedin.com/in/ardaaydınkılınç/",
            Email = "ardaaydinkilinc@gmail.com"
        });

        // Seed default about
        modelBuilder.Entity<About>().HasData(new About
        {
            Id = 1,
            Intro = "I'm a dedicated software engineer with expertise in modern web technologies and a passion for building scalable, high-performance applications. Currently advancing my proficiency in TypeScript, Redux, and Node.js while exploring emerging technologies including quantum computing.",
            EducationTitle = "Computer Engineering",
            EducationDetail = "Bursa Technical University (2021-2026)",
            EducationPeriod = "2021-2026",
            CurrentRole = "Software Developer",
            CurrentCompany = "Ithinka IT and IoT Technologies",
            FocusTitle = "Backend Development & Scalable Systems",
            FocusDetail = "RESTful APIs, Database Optimization",
            WhatIDo = "[\"Architecting responsive web applications with React and Angular\",\"Designing and implementing scalable backend systems\",\"Database optimization and API development\",\"Staying current with industry best practices and emerging technologies\"]",
            CtaText = "I actively seek opportunities to collaborate with fellow developers, contribute to meaningful projects, and engage in knowledge sharing within the tech community. I'm particularly interested in discussing innovative solutions, software architecture, and the future of technology."
        });

        // Seed default stats
        modelBuilder.Entity<Stat>().HasData(
            new Stat { Id = 1, Number = "3+", Label = "Years of Experience", DisplayOrder = 1 },
            new Stat { Id = 2, Number = "10+", Label = "Technologies", DisplayOrder = 2 },
            new Stat { Id = 3, Number = "5+", Label = "Projects Completed", DisplayOrder = 3 },
            new Stat { Id = 4, Number = "400+", Label = "Community Members Led", DisplayOrder = 4 }
        );

        // Seed default contact
        modelBuilder.Entity<Contact>().HasData(new Contact
        {
            Id = 1,
            Email = "ardaaydinkilinc@gmail.com",
            Phone = "+90 542 117 04 72",
            Location = "Bursa, Turkey",
            IntroTitle = "Let's Connect!",
            IntroText = "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Whether you have a question or just want to say hi, feel free to reach out!",
            CtaText = "Ready to start a conversation?"
        });

        // Seed social links
        modelBuilder.Entity<SocialLink>().HasData(
            new SocialLink { Id = 1, Name = "GitHub", IconClass = "FaGithub", Url = "https://github.com/adraarda23", Color = "#333", DisplayOrder = 1 },
            new SocialLink { Id = 2, Name = "LinkedIn", IconClass = "FaLinkedin", Url = "https://www.linkedin.com/in/ardaaydınkılınç/", Color = "#0077b5", DisplayOrder = 2 },
            new SocialLink { Id = 3, Name = "Email", IconClass = "FaEnvelope", Url = "mailto:ardaaydinkilinc@gmail.com", Color = "#ea4335", DisplayOrder = 3 }
        );

        // Seed experiences
        modelBuilder.Entity<Experience>().HasData(
            new Experience { Id = 1, Title = "Software Developer", Company = "Ithinka IT and IoT Technologies", Type = "Internship", Location = "Türkiye · On-site", Period = "Sep 2025 - Present", Duration = "3 months", Description = "Working on IoT and software development projects, contributing to modern web applications.", Technologies = "JavaScript,Node.js,IoT", DisplayOrder = 1 },
            new Experience { Id = 2, Title = "Software Developer", Company = "EPİAŞ (Energy Exchange Istanbul)", Type = "Internship", Location = "İstanbul, Türkiye · On-site", Period = "Aug 2025 - Sep 2025", Duration = "2 months", Description = "Developed enterprise-level applications using Spring Boot and Apache Kafka for energy trading systems.", Technologies = "Spring Boot,Apache Kafka,Java", DisplayOrder = 2 },
            new Experience { Id = 3, Title = "Full-Stack Developer", Company = "Uludag Project - Medical Imaging", Type = "Scholarship", Location = "Bursa, Türkiye · Remote", Period = "Jun 2024 - Jun 2025", Duration = "1 year", Description = "Built medical imaging platform with Flask RESTful API and Angular frontend. Implemented Agile methodology in team collaboration.", Technologies = "Angular,Flask,Python,REST API", DisplayOrder = 3 },
            new Experience { Id = 4, Title = "Community Lead", Company = "BTU Computer Science Society", Type = "Leadership", Location = "Bursa, Türkiye", Period = "Oct 2024 - Jul 2025", Duration = "10 months", Description = "Led a community of 400+ members, organized workshops, seminars, and hackathons. Coordinated technical events and fostered collaboration.", Technologies = "Leadership,Event Management,Community Building", DisplayOrder = 4 },
            new Experience { Id = 5, Title = "Co-Lead", Company = "BTU Computer Science Society", Type = "Leadership", Location = "Bursa, Türkiye", Period = "Oct 2023 - Oct 2024", Duration = "1 year", Description = "Assisted in community management and event organization. Helped grow the community and establish technical programs.", Technologies = "Team Coordination,Event Planning", DisplayOrder = 5 }
        );

        // Seed projects
        modelBuilder.Entity<Project>().HasData(
            new Project { Id = 1, Title = "Medical Imaging Platform", Description = "A comprehensive medical imaging platform built with Angular and Flask. Features include image processing, RESTful API integration, and real-time data visualization for medical professionals.", Technologies = "Angular,Flask,Python,REST API,TypeScript", Category = "Full-Stack", Year = "2024-2025", DisplayOrder = 1 },
            new Project { Id = 2, Title = "React Portfolio Website", Description = "Modern and responsive portfolio website built with React and Framer Motion. Features smooth animations, component-based architecture, and optimized performance.", Technologies = "React,Framer Motion,CSS3,JavaScript", Category = "Frontend", Year = "2023", GithubUrl = "https://github.com/adraarda23", DisplayOrder = 2 },
            new Project { Id = 3, Title = "Hafize Ana - University Food Bot", Description = "Multi-platform bot for Discord and Telegram that provides daily university cafeteria menus. Automated menu updates and notifications for students.", Technologies = "Python,Discord API,Telegram API,Web Scraping", Category = "Backend", Year = "2022", GithubUrl = "https://github.com/adraarda23", DisplayOrder = 3 },
            new Project { Id = 4, Title = "Energy Trading System", Description = "Enterprise-level application for energy trading operations using Spring Boot and Apache Kafka. Implemented real-time data processing and event-driven architecture.", Technologies = "Spring Boot,Apache Kafka,Java,Microservices", Category = "Backend", Year = "2025", DisplayOrder = 4 }
        );

        // Seed skill categories and skills
        modelBuilder.Entity<SkillCategory>().HasData(
            new SkillCategory { Id = 1, Title = "Languages", Icon = "💻", DisplayOrder = 1 },
            new SkillCategory { Id = 2, Title = "Frontend", Icon = "🎨", DisplayOrder = 2 },
            new SkillCategory { Id = 3, Title = "Backend", Icon = "⚙️", DisplayOrder = 3 },
            new SkillCategory { Id = 4, Title = "Databases", Icon = "🗄️", DisplayOrder = 4 },
            new SkillCategory { Id = 5, Title = "DevOps & Tools", Icon = "🛠️", DisplayOrder = 5 }
        );

        modelBuilder.Entity<Skill>().HasData(
            // Languages
            new Skill { Id = 1, Name = "JavaScript", IconClass = "SiJavascript", Level = 90, DisplayOrder = 1, SkillCategoryId = 1 },
            new Skill { Id = 2, Name = "TypeScript", IconClass = "SiTypescript", Level = 85, DisplayOrder = 2, SkillCategoryId = 1 },
            new Skill { Id = 3, Name = "Python", IconClass = "FaPython", Level = 85, DisplayOrder = 3, SkillCategoryId = 1 },
            new Skill { Id = 4, Name = "Java", IconClass = "FaJava", Level = 80, DisplayOrder = 4, SkillCategoryId = 1 },
            new Skill { Id = 5, Name = "SQL", IconClass = "FaDatabase", Level = 85, DisplayOrder = 5, SkillCategoryId = 1 },
            // Frontend
            new Skill { Id = 6, Name = "React", IconClass = "FaReact", Level = 90, DisplayOrder = 1, SkillCategoryId = 2 },
            new Skill { Id = 7, Name = "Angular", IconClass = "FaAngular", Level = 80, DisplayOrder = 2, SkillCategoryId = 2 },
            new Skill { Id = 8, Name = "Redux", IconClass = "SiRedux", Level = 75, DisplayOrder = 3, SkillCategoryId = 2 },
            new Skill { Id = 9, Name = "HTML/CSS", IconClass = "HtmlCss", Level = 90, DisplayOrder = 4, SkillCategoryId = 2 },
            // Backend
            new Skill { Id = 10, Name = "Node.js", IconClass = "FaNode", Level = 85, DisplayOrder = 1, SkillCategoryId = 3 },
            new Skill { Id = 11, Name = "Express.js", IconClass = "SiExpress", Level = 85, DisplayOrder = 2, SkillCategoryId = 3 },
            new Skill { Id = 12, Name = "Flask", IconClass = "SiFlask", Level = 80, DisplayOrder = 3, SkillCategoryId = 3 },
            new Skill { Id = 13, Name = "Spring Boot", IconClass = "SiSpringboot", Level = 75, DisplayOrder = 4, SkillCategoryId = 3 },
            new Skill { Id = 14, Name = "REST API", IconClass = "RestApi", Level = 90, DisplayOrder = 5, SkillCategoryId = 3 },
            // Databases
            new Skill { Id = 15, Name = "PostgreSQL", IconClass = "SiPostgresql", Level = 85, DisplayOrder = 1, SkillCategoryId = 4 },
            new Skill { Id = 16, Name = "MongoDB", IconClass = "SiMongodb", Level = 80, DisplayOrder = 2, SkillCategoryId = 4 },
            new Skill { Id = 17, Name = "MySQL", IconClass = "SiMysql", Level = 80, DisplayOrder = 3, SkillCategoryId = 4 },
            new Skill { Id = 18, Name = "SQLite", IconClass = "FaDatabase", Level = 75, DisplayOrder = 4, SkillCategoryId = 4 },
            // DevOps
            new Skill { Id = 19, Name = "Docker", IconClass = "FaDocker", Level = 80, DisplayOrder = 1, SkillCategoryId = 5 },
            new Skill { Id = 20, Name = "Git", IconClass = "FaGitAlt", Level = 90, DisplayOrder = 2, SkillCategoryId = 5 },
            new Skill { Id = 21, Name = "Linux", IconClass = "FaLinux", Level = 80, DisplayOrder = 3, SkillCategoryId = 5 },
            new Skill { Id = 22, Name = "NGINX", IconClass = "SiNginx", Level = 70, DisplayOrder = 4, SkillCategoryId = 5 },
            new Skill { Id = 23, Name = "Apache Kafka", IconClass = "SiApachekafka", Level = 70, DisplayOrder = 5, SkillCategoryId = 5 }
        );
    }
}
