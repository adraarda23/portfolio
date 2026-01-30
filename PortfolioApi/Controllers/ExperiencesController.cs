using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortfolioApi.Data;
using PortfolioApi.DTOs;

namespace PortfolioApi.Controllers;

[ApiController]
[Route("[controller]")]
public class ExperiencesController : ControllerBase
{
    private readonly PortfolioDbContext _context;

    public ExperiencesController(PortfolioDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<ExperienceDto>>> GetAll()
    {
        var experiences = await _context.Experiences.OrderBy(e => e.DisplayOrder).ToListAsync();
        return experiences.Select(e => new ExperienceDto(
            e.Id, e.Title, e.Company, e.Type, e.Location, e.Period, e.Duration,
            e.Description, e.Technologies.Split(',').ToList(), e.DisplayOrder
        )).ToList();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ExperienceDto>> Get(int id)
    {
        var e = await _context.Experiences.FindAsync(id);
        if (e == null) return NotFound();

        return new ExperienceDto(
            e.Id, e.Title, e.Company, e.Type, e.Location, e.Period, e.Duration,
            e.Description, e.Technologies.Split(',').ToList(), e.DisplayOrder
        );
    }

    [HttpPost]
    public async Task<ActionResult<ExperienceDto>> Create(CreateExperienceDto dto)
    {
        var experience = new Entities.Experience
        {
            Title = dto.Title,
            Company = dto.Company,
            Type = dto.Type,
            Location = dto.Location,
            Period = dto.Period,
            Duration = dto.Duration,
            Description = dto.Description,
            Technologies = string.Join(",", dto.Technologies),
            DisplayOrder = dto.DisplayOrder
        };

        _context.Experiences.Add(experience);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(Get), new { id = experience.Id }, new ExperienceDto(
            experience.Id, experience.Title, experience.Company, experience.Type,
            experience.Location, experience.Period, experience.Duration,
            experience.Description, dto.Technologies, experience.DisplayOrder
        ));
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, UpdateExperienceDto dto)
    {
        var experience = await _context.Experiences.FindAsync(id);
        if (experience == null) return NotFound();

        experience.Title = dto.Title;
        experience.Company = dto.Company;
        experience.Type = dto.Type;
        experience.Location = dto.Location;
        experience.Period = dto.Period;
        experience.Duration = dto.Duration;
        experience.Description = dto.Description;
        experience.Technologies = string.Join(",", dto.Technologies);
        experience.DisplayOrder = dto.DisplayOrder;

        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var experience = await _context.Experiences.FindAsync(id);
        if (experience == null) return NotFound();

        _context.Experiences.Remove(experience);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
