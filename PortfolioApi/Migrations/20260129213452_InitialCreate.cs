using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace PortfolioApi.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Abouts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Intro = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    EducationTitle = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    EducationDetail = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    EducationPeriod = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CurrentRole = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CurrentCompany = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    FocusTitle = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    FocusDetail = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    WhatIDo = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CtaText = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Abouts", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Admins",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Username = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PasswordHash = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Admins", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Contacts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Email = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Phone = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Location = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    IntroTitle = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    IntroText = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CtaText = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Contacts", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Experiences",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Title = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Company = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Type = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Location = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Period = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Duration = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Description = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Technologies = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    DisplayOrder = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Experiences", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Profiles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Title = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Subtitle = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Description = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    GithubUrl = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    LinkedinUrl = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Email = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Profiles", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Projects",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Title = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Description = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Technologies = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Category = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Year = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    GithubUrl = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    DemoUrl = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    DisplayOrder = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Projects", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "SkillCategories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Title = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Icon = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    DisplayOrder = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SkillCategories", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "SocialLinks",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    IconClass = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Url = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Color = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    DisplayOrder = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SocialLinks", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Stats",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Number = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Label = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    DisplayOrder = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stats", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Skills",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    IconClass = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Level = table.Column<int>(type: "int", nullable: false),
                    DisplayOrder = table.Column<int>(type: "int", nullable: false),
                    SkillCategoryId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Skills", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Skills_SkillCategories_SkillCategoryId",
                        column: x => x.SkillCategoryId,
                        principalTable: "SkillCategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.InsertData(
                table: "Abouts",
                columns: new[] { "Id", "CtaText", "CurrentCompany", "CurrentRole", "EducationDetail", "EducationPeriod", "EducationTitle", "FocusDetail", "FocusTitle", "Intro", "WhatIDo" },
                values: new object[] { 1, "I actively seek opportunities to collaborate with fellow developers, contribute to meaningful projects, and engage in knowledge sharing within the tech community. I'm particularly interested in discussing innovative solutions, software architecture, and the future of technology.", "Ithinka IT and IoT Technologies", "Software Developer", "Bursa Technical University (2021-2026)", "2021-2026", "Computer Engineering", "RESTful APIs, Database Optimization", "Backend Development & Scalable Systems", "I'm a dedicated software engineer with expertise in modern web technologies and a passion for building scalable, high-performance applications. Currently advancing my proficiency in TypeScript, Redux, and Node.js while exploring emerging technologies including quantum computing.", "[\"Architecting responsive web applications with React and Angular\",\"Designing and implementing scalable backend systems\",\"Database optimization and API development\",\"Staying current with industry best practices and emerging technologies\"]" });

            migrationBuilder.InsertData(
                table: "Admins",
                columns: new[] { "Id", "PasswordHash", "Username" },
                values: new object[] { 1, "$2a$11$YY1HXZYxDGCqApXuR9YqeuzBVmw/cRXAoso.a9Y7ce7aTGvPXzCVy", "ardaadmin" });

            migrationBuilder.InsertData(
                table: "Contacts",
                columns: new[] { "Id", "CtaText", "Email", "IntroText", "IntroTitle", "Location", "Phone" },
                values: new object[] { 1, "Ready to start a conversation?", "ardaaydinkilinc@gmail.com", "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Whether you have a question or just want to say hi, feel free to reach out!", "Let's Connect!", "Bursa, Turkey", "+90 542 117 04 72" });

            migrationBuilder.InsertData(
                table: "Experiences",
                columns: new[] { "Id", "Company", "Description", "DisplayOrder", "Duration", "Location", "Period", "Technologies", "Title", "Type" },
                values: new object[,]
                {
                    { 1, "Ithinka IT and IoT Technologies", "Working on IoT and software development projects, contributing to modern web applications.", 1, "3 months", "Türkiye · On-site", "Sep 2025 - Present", "JavaScript,Node.js,IoT", "Software Developer", "Internship" },
                    { 2, "EPİAŞ (Energy Exchange Istanbul)", "Developed enterprise-level applications using Spring Boot and Apache Kafka for energy trading systems.", 2, "2 months", "İstanbul, Türkiye · On-site", "Aug 2025 - Sep 2025", "Spring Boot,Apache Kafka,Java", "Software Developer", "Internship" },
                    { 3, "Uludag Project - Medical Imaging", "Built medical imaging platform with Flask RESTful API and Angular frontend. Implemented Agile methodology in team collaboration.", 3, "1 year", "Bursa, Türkiye · Remote", "Jun 2024 - Jun 2025", "Angular,Flask,Python,REST API", "Full-Stack Developer", "Scholarship" },
                    { 4, "BTU Computer Science Society", "Led a community of 400+ members, organized workshops, seminars, and hackathons. Coordinated technical events and fostered collaboration.", 4, "10 months", "Bursa, Türkiye", "Oct 2024 - Jul 2025", "Leadership,Event Management,Community Building", "Community Lead", "Leadership" },
                    { 5, "BTU Computer Science Society", "Assisted in community management and event organization. Helped grow the community and establish technical programs.", 5, "1 year", "Bursa, Türkiye", "Oct 2023 - Oct 2024", "Team Coordination,Event Planning", "Co-Lead", "Leadership" }
                });

            migrationBuilder.InsertData(
                table: "Profiles",
                columns: new[] { "Id", "Description", "Email", "GithubUrl", "LinkedinUrl", "Name", "Subtitle", "Title" },
                values: new object[] { 1, "Passionate software engineer specializing in backend development and scalable systems. Building robust applications with modern technologies.", "ardaaydinkilinc@gmail.com", "https://github.com/adraarda23", "https://www.linkedin.com/in/ardaaydınkılınç/", "Arda Aydın Kılınç", "👋 Hello, I'm", "Backend Developer" });

            migrationBuilder.InsertData(
                table: "Projects",
                columns: new[] { "Id", "Category", "DemoUrl", "Description", "DisplayOrder", "GithubUrl", "Technologies", "Title", "Year" },
                values: new object[,]
                {
                    { 1, "Full-Stack", null, "A comprehensive medical imaging platform built with Angular and Flask. Features include image processing, RESTful API integration, and real-time data visualization for medical professionals.", 1, null, "Angular,Flask,Python,REST API,TypeScript", "Medical Imaging Platform", "2024-2025" },
                    { 2, "Frontend", null, "Modern and responsive portfolio website built with React and Framer Motion. Features smooth animations, component-based architecture, and optimized performance.", 2, "https://github.com/adraarda23", "React,Framer Motion,CSS3,JavaScript", "React Portfolio Website", "2023" },
                    { 3, "Backend", null, "Multi-platform bot for Discord and Telegram that provides daily university cafeteria menus. Automated menu updates and notifications for students.", 3, "https://github.com/adraarda23", "Python,Discord API,Telegram API,Web Scraping", "Hafize Ana - University Food Bot", "2022" },
                    { 4, "Backend", null, "Enterprise-level application for energy trading operations using Spring Boot and Apache Kafka. Implemented real-time data processing and event-driven architecture.", 4, null, "Spring Boot,Apache Kafka,Java,Microservices", "Energy Trading System", "2025" }
                });

            migrationBuilder.InsertData(
                table: "SkillCategories",
                columns: new[] { "Id", "DisplayOrder", "Icon", "Title" },
                values: new object[,]
                {
                    { 1, 1, "💻", "Languages" },
                    { 2, 2, "🎨", "Frontend" },
                    { 3, 3, "⚙️", "Backend" },
                    { 4, 4, "🗄️", "Databases" },
                    { 5, 5, "🛠️", "DevOps & Tools" }
                });

            migrationBuilder.InsertData(
                table: "SocialLinks",
                columns: new[] { "Id", "Color", "DisplayOrder", "IconClass", "Name", "Url" },
                values: new object[,]
                {
                    { 1, "#333", 1, "FaGithub", "GitHub", "https://github.com/adraarda23" },
                    { 2, "#0077b5", 2, "FaLinkedin", "LinkedIn", "https://www.linkedin.com/in/ardaaydınkılınç/" },
                    { 3, "#ea4335", 3, "FaEnvelope", "Email", "mailto:ardaaydinkilinc@gmail.com" }
                });

            migrationBuilder.InsertData(
                table: "Stats",
                columns: new[] { "Id", "DisplayOrder", "Label", "Number" },
                values: new object[,]
                {
                    { 1, 1, "Years of Experience", "3+" },
                    { 2, 2, "Technologies", "10+" },
                    { 3, 3, "Projects Completed", "5+" },
                    { 4, 4, "Community Members Led", "400+" }
                });

            migrationBuilder.InsertData(
                table: "Skills",
                columns: new[] { "Id", "DisplayOrder", "IconClass", "Level", "Name", "SkillCategoryId" },
                values: new object[,]
                {
                    { 1, 1, "SiJavascript", 90, "JavaScript", 1 },
                    { 2, 2, "SiTypescript", 85, "TypeScript", 1 },
                    { 3, 3, "FaPython", 85, "Python", 1 },
                    { 4, 4, "FaJava", 80, "Java", 1 },
                    { 5, 5, "FaDatabase", 85, "SQL", 1 },
                    { 6, 1, "FaReact", 90, "React", 2 },
                    { 7, 2, "FaAngular", 80, "Angular", 2 },
                    { 8, 3, "SiRedux", 75, "Redux", 2 },
                    { 9, 4, "HtmlCss", 90, "HTML/CSS", 2 },
                    { 10, 1, "FaNode", 85, "Node.js", 3 },
                    { 11, 2, "SiExpress", 85, "Express.js", 3 },
                    { 12, 3, "SiFlask", 80, "Flask", 3 },
                    { 13, 4, "SiSpringboot", 75, "Spring Boot", 3 },
                    { 14, 5, "RestApi", 90, "REST API", 3 },
                    { 15, 1, "SiPostgresql", 85, "PostgreSQL", 4 },
                    { 16, 2, "SiMongodb", 80, "MongoDB", 4 },
                    { 17, 3, "SiMysql", 80, "MySQL", 4 },
                    { 18, 4, "FaDatabase", 75, "SQLite", 4 },
                    { 19, 1, "FaDocker", 80, "Docker", 5 },
                    { 20, 2, "FaGitAlt", 90, "Git", 5 },
                    { 21, 3, "FaLinux", 80, "Linux", 5 },
                    { 22, 4, "SiNginx", 70, "NGINX", 5 },
                    { 23, 5, "SiApachekafka", 70, "Apache Kafka", 5 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Skills_SkillCategoryId",
                table: "Skills",
                column: "SkillCategoryId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Abouts");

            migrationBuilder.DropTable(
                name: "Admins");

            migrationBuilder.DropTable(
                name: "Contacts");

            migrationBuilder.DropTable(
                name: "Experiences");

            migrationBuilder.DropTable(
                name: "Profiles");

            migrationBuilder.DropTable(
                name: "Projects");

            migrationBuilder.DropTable(
                name: "Skills");

            migrationBuilder.DropTable(
                name: "SocialLinks");

            migrationBuilder.DropTable(
                name: "Stats");

            migrationBuilder.DropTable(
                name: "SkillCategories");
        }
    }
}
