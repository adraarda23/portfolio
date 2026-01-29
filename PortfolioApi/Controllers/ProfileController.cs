using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortfolioApi.Data;
using PortfolioApi.DTOs;

namespace PortfolioApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProfileController : ControllerBase
{
    private readonly PortfolioDbContext _context;

    public ProfileController(PortfolioDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<ProfileDto>> Get()
    {
        var profile = await _context.Profiles.FirstOrDefaultAsync();
        if (profile == null) return NotFound();
        
        return new ProfileDto(
            profile.Id, profile.Name, profile.Title, profile.Subtitle,
            profile.Description, profile.GithubUrl, profile.LinkedinUrl, profile.Email
        );
    }

    [HttpPut]
    public async Task<IActionResult> Update(UpdateProfileDto dto)
    {
        var profile = await _context.Profiles.FirstOrDefaultAsync();
        if (profile == null) return NotFound();

        profile.Name = dto.Name;
        profile.Title = dto.Title;
        profile.Subtitle = dto.Subtitle;
        profile.Description = dto.Description;
        profile.GithubUrl = dto.GithubUrl;
        profile.LinkedinUrl = dto.LinkedinUrl;
        profile.Email = dto.Email;

        await _context.SaveChangesAsync();
        return NoContent();
    }
}
