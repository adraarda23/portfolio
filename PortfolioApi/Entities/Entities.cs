namespace PortfolioApi.Entities;

public class Profile
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Subtitle { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string GithubUrl { get; set; } = string.Empty;
    public string LinkedinUrl { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
}

public class About
{
    public int Id { get; set; }
    public string Intro { get; set; } = string.Empty;
    public string EducationTitle { get; set; } = string.Empty;
    public string EducationDetail { get; set; } = string.Empty;
    public string EducationPeriod { get; set; } = string.Empty;
    public string CurrentRole { get; set; } = string.Empty;
    public string CurrentCompany { get; set; } = string.Empty;
    public string FocusTitle { get; set; } = string.Empty;
    public string FocusDetail { get; set; } = string.Empty;
    public string WhatIDo { get; set; } = string.Empty; // JSON array stored as string
    public string CtaText { get; set; } = string.Empty;
}

public class Stat
{
    public int Id { get; set; }
    public string Number { get; set; } = string.Empty;
    public string Label { get; set; } = string.Empty;
    public int DisplayOrder { get; set; }
}

public class Experience
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Company { get; set; } = string.Empty;
    public string Type { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public string Period { get; set; } = string.Empty;
    public string Duration { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Technologies { get; set; } = string.Empty; // Comma-separated
    public int DisplayOrder { get; set; }
}

public class SkillCategory
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Icon { get; set; } = string.Empty;
    public int DisplayOrder { get; set; }
    public List<Skill> Skills { get; set; } = new();
}

public class Skill
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string IconClass { get; set; } = string.Empty;
    public int Level { get; set; }
    public int DisplayOrder { get; set; }
    public int SkillCategoryId { get; set; }
    public SkillCategory? SkillCategory { get; set; }
}

public class Project
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Technologies { get; set; } = string.Empty; // Comma-separated
    public string Category { get; set; } = string.Empty;
    public string Year { get; set; } = string.Empty;
    public string? GithubUrl { get; set; }
    public string? DemoUrl { get; set; }
    public int DisplayOrder { get; set; }
}

public class Contact
{
    public int Id { get; set; }
    public string Email { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public string IntroTitle { get; set; } = string.Empty;
    public string IntroText { get; set; } = string.Empty;
    public string CtaText { get; set; } = string.Empty;
}

public class SocialLink
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string IconClass { get; set; } = string.Empty;
    public string Url { get; set; } = string.Empty;
    public string Color { get; set; } = string.Empty;
    public int DisplayOrder { get; set; }
}

public class Admin
{
    public int Id { get; set; }
    public string Username { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
}
