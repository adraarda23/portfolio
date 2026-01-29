using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortfolioApi.Data;
using PortfolioApi.DTOs;

namespace PortfolioApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProjectsController : ControllerBase
{
    private readonly PortfolioDbContext _context;

    public ProjectsController(PortfolioDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<ProjectDto>>> GetAll()
    {
        var projects = await _context.Projects.OrderBy(p => p.DisplayOrder).ToListAsync();
        return projects.Select(p => new ProjectDto(
            p.Id, p.Title, p.Description, p.Technologies.Split(',').ToList(),
            p.Category, p.Year, p.GithubUrl, p.DemoUrl, p.DisplayOrder
        )).ToList();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ProjectDto>> Get(int id)
    {
        var p = await _context.Projects.FindAsync(id);
        if (p == null) return NotFound();

        return new ProjectDto(
            p.Id, p.Title, p.Description, p.Technologies.Split(',').ToList(),
            p.Category, p.Year, p.GithubUrl, p.DemoUrl, p.DisplayOrder
        );
    }

    [HttpPost]
    public async Task<ActionResult<ProjectDto>> Create(CreateProjectDto dto)
    {
        var project = new Entities.Project
        {
            Title = dto.Title,
            Description = dto.Description,
            Technologies = string.Join(",", dto.Technologies),
            Category = dto.Category,
            Year = dto.Year,
            GithubUrl = dto.GithubUrl,
            DemoUrl = dto.DemoUrl,
            DisplayOrder = dto.DisplayOrder
        };

        _context.Projects.Add(project);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(Get), new { id = project.Id }, new ProjectDto(
            project.Id, project.Title, project.Description, dto.Technologies,
            project.Category, project.Year, project.GithubUrl, project.DemoUrl, project.DisplayOrder
        ));
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, UpdateProjectDto dto)
    {
        var project = await _context.Projects.FindAsync(id);
        if (project == null) return NotFound();

        project.Title = dto.Title;
        project.Description = dto.Description;
        project.Technologies = string.Join(",", dto.Technologies);
        project.Category = dto.Category;
        project.Year = dto.Year;
        project.GithubUrl = dto.GithubUrl;
        project.DemoUrl = dto.DemoUrl;
        project.DisplayOrder = dto.DisplayOrder;

        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var project = await _context.Projects.FindAsync(id);
        if (project == null) return NotFound();

        _context.Projects.Remove(project);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
