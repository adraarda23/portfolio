namespace PortfolioApi.DTOs;

// Profile DTOs
public record ProfileDto(int Id, string Name, string Title, string Subtitle, string Description, string GithubUrl, string LinkedinUrl, string Email);
public record UpdateProfileDto(string Name, string Title, string Subtitle, string Description, string GithubUrl, string LinkedinUrl, string Email);

// About DTOs
public record AboutDto(int Id, string Intro, string EducationTitle, string EducationDetail, string EducationPeriod, string CurrentRole, string CurrentCompany, string FocusTitle, string FocusDetail, List<string> WhatIDo, string CtaText);
public record UpdateAboutDto(string Intro, string EducationTitle, string EducationDetail, string EducationPeriod, string CurrentRole, string CurrentCompany, string FocusTitle, string FocusDetail, List<string> WhatIDo, string CtaText);

// Stat DTOs
public record StatDto(int Id, string Number, string Label, int DisplayOrder);
public record CreateStatDto(string Number, string Label, int DisplayOrder);
public record UpdateStatDto(string Number, string Label, int DisplayOrder);

// Experience DTOs
public record ExperienceDto(int Id, string Title, string Company, string Type, string Location, string Period, string Duration, string Description, List<string> Technologies, int DisplayOrder);
public record CreateExperienceDto(string Title, string Company, string Type, string Location, string Period, string Duration, string Description, List<string> Technologies, int DisplayOrder);
public record UpdateExperienceDto(string Title, string Company, string Type, string Location, string Period, string Duration, string Description, List<string> Technologies, int DisplayOrder);

// Skill Category DTOs
public record SkillCategoryDto(int Id, string Title, string Icon, int DisplayOrder, List<SkillDto> Skills);
public record CreateSkillCategoryDto(string Title, string Icon, int DisplayOrder);
public record UpdateSkillCategoryDto(string Title, string Icon, int DisplayOrder);

// Skill DTOs
public record SkillDto(int Id, string Name, string IconClass, int Level, int DisplayOrder, int SkillCategoryId);
public record CreateSkillDto(string Name, string IconClass, int Level, int DisplayOrder, int SkillCategoryId);
public record UpdateSkillDto(string? Name, string? IconClass, int Level, int DisplayOrder, int SkillCategoryId);

// Project DTOs
public record ProjectDto(int Id, string Title, string Description, List<string> Technologies, string Category, string Year, string? GithubUrl, string? DemoUrl, int DisplayOrder);
public record CreateProjectDto(string Title, string Description, List<string> Technologies, string Category, string Year, string? GithubUrl, string? DemoUrl, int DisplayOrder);
public record UpdateProjectDto(string Title, string Description, List<string> Technologies, string Category, string Year, string? GithubUrl, string? DemoUrl, int DisplayOrder);

// Contact DTOs
public record ContactDto(int Id, string Email, string Phone, string Location, string IntroTitle, string IntroText, string CtaText);
public record UpdateContactDto(string Email, string Phone, string Location, string IntroTitle, string IntroText, string CtaText);

// Social Link DTOs
public record SocialLinkDto(int Id, string Name, string IconClass, string Url, string Color, int DisplayOrder);
public record CreateSocialLinkDto(string Name, string IconClass, string Url, string Color, int DisplayOrder);
public record UpdateSocialLinkDto(string Name, string IconClass, string Url, string Color, int DisplayOrder);

// Auth DTOs
public record LoginDto(string Username, string Password);
public record LoginResponseDto(string Token, string Username);
