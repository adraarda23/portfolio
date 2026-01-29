using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortfolioApi.Data;
using PortfolioApi.DTOs;
using System.Text.Json;

namespace PortfolioApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AboutController : ControllerBase
{
    private readonly PortfolioDbContext _context;

    public AboutController(PortfolioDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<AboutDto>> Get()
    {
        var about = await _context.Abouts.FirstOrDefaultAsync();
        if (about == null) return NotFound();

        var whatIDo = JsonSerializer.Deserialize<List<string>>(about.WhatIDo) ?? new List<string>();
        
        return new AboutDto(
            about.Id, about.Intro, about.EducationTitle, about.EducationDetail,
            about.EducationPeriod, about.CurrentRole, about.CurrentCompany,
            about.FocusTitle, about.FocusDetail, whatIDo, about.CtaText
        );
    }

    [HttpPut]
    public async Task<IActionResult> Update(UpdateAboutDto dto)
    {
        var about = await _context.Abouts.FirstOrDefaultAsync();
        if (about == null) return NotFound();

        about.Intro = dto.Intro;
        about.EducationTitle = dto.EducationTitle;
        about.EducationDetail = dto.EducationDetail;
        about.EducationPeriod = dto.EducationPeriod;
        about.CurrentRole = dto.CurrentRole;
        about.CurrentCompany = dto.CurrentCompany;
        about.FocusTitle = dto.FocusTitle;
        about.FocusDetail = dto.FocusDetail;
        about.WhatIDo = JsonSerializer.Serialize(dto.WhatIDo);
        about.CtaText = dto.CtaText;

        await _context.SaveChangesAsync();
        return NoContent();
    }
}

[ApiController]
[Route("api/[controller]")]
public class StatsController : ControllerBase
{
    private readonly PortfolioDbContext _context;

    public StatsController(PortfolioDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<StatDto>>> GetAll()
    {
        var stats = await _context.Stats.OrderBy(s => s.DisplayOrder).ToListAsync();
        return stats.Select(s => new StatDto(s.Id, s.Number, s.Label, s.DisplayOrder)).ToList();
    }

    [HttpPost]
    public async Task<ActionResult<StatDto>> Create(CreateStatDto dto)
    {
        var stat = new Entities.Stat
        {
            Number = dto.Number,
            Label = dto.Label,
            DisplayOrder = dto.DisplayOrder
        };
        _context.Stats.Add(stat);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetAll), new StatDto(stat.Id, stat.Number, stat.Label, stat.DisplayOrder));
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, UpdateStatDto dto)
    {
        var stat = await _context.Stats.FindAsync(id);
        if (stat == null) return NotFound();

        stat.Number = dto.Number;
        stat.Label = dto.Label;
        stat.DisplayOrder = dto.DisplayOrder;

        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var stat = await _context.Stats.FindAsync(id);
        if (stat == null) return NotFound();

        _context.Stats.Remove(stat);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
