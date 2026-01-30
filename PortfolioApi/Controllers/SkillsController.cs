using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortfolioApi.Data;
using PortfolioApi.DTOs;

namespace PortfolioApi.Controllers;

[ApiController]
[Route("skill-categories")]
public class SkillCategoriesController : ControllerBase
{
    private readonly PortfolioDbContext _context;

    public SkillCategoriesController(PortfolioDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<SkillCategoryDto>>> GetAll()
    {
        var categories = await _context.SkillCategories
            .Include(c => c.Skills.OrderBy(s => s.DisplayOrder))
            .OrderBy(c => c.DisplayOrder)
            .ToListAsync();

        return categories.Select(c => new SkillCategoryDto(
            c.Id, c.Title, c.Icon, c.DisplayOrder,
            c.Skills.Select(s => new SkillDto(s.Id, s.Name, s.IconClass, s.Level, s.DisplayOrder, s.SkillCategoryId)).ToList()
        )).ToList();
    }

    [HttpPost]
    public async Task<ActionResult<SkillCategoryDto>> Create(CreateSkillCategoryDto dto)
    {
        var category = new Entities.SkillCategory
        {
            Title = dto.Title,
            Icon = dto.Icon,
            DisplayOrder = dto.DisplayOrder
        };

        _context.SkillCategories.Add(category);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetAll), new SkillCategoryDto(category.Id, category.Title, category.Icon, category.DisplayOrder, new List<SkillDto>()));
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, UpdateSkillCategoryDto dto)
    {
        var category = await _context.SkillCategories.FindAsync(id);
        if (category == null) return NotFound();

        category.Title = dto.Title;
        category.Icon = dto.Icon;
        category.DisplayOrder = dto.DisplayOrder;

        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var category = await _context.SkillCategories.Include(c => c.Skills).FirstOrDefaultAsync(c => c.Id == id);
        if (category == null) return NotFound();

        _context.SkillCategories.Remove(category);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}

[ApiController]
[Route("[controller]")]
public class SkillsController : ControllerBase
{
    private readonly PortfolioDbContext _context;

    public SkillsController(PortfolioDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<SkillDto>>> GetAll()
    {
        var skills = await _context.Skills.OrderBy(s => s.DisplayOrder).ToListAsync();
        return skills.Select(s => new SkillDto(s.Id, s.Name, s.IconClass, s.Level, s.DisplayOrder, s.SkillCategoryId)).ToList();
    }

    [HttpPost]
    public async Task<ActionResult<SkillDto>> Create(CreateSkillDto dto)
    {
        var skill = new Entities.Skill
        {
            Name = dto.Name,
            IconClass = dto.IconClass,
            Level = dto.Level,
            DisplayOrder = dto.DisplayOrder,
            SkillCategoryId = dto.SkillCategoryId
        };

        _context.Skills.Add(skill);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetAll), new SkillDto(skill.Id, skill.Name, skill.IconClass, skill.Level, skill.DisplayOrder, skill.SkillCategoryId));
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateSkillDto dto)
    {
        var skill = await _context.Skills.FindAsync(id);
        if (skill == null) return NotFound();

        // Partial update - only update fields that are provided
        if (!string.IsNullOrEmpty(dto.Name)) skill.Name = dto.Name;
        if (!string.IsNullOrEmpty(dto.IconClass)) skill.IconClass = dto.IconClass;
        if (dto.Level > 0) skill.Level = dto.Level;
        if (dto.DisplayOrder > 0) skill.DisplayOrder = dto.DisplayOrder;
        if (dto.SkillCategoryId > 0) skill.SkillCategoryId = dto.SkillCategoryId;

        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var skill = await _context.Skills.FindAsync(id);
        if (skill == null) return NotFound();

        _context.Skills.Remove(skill);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
