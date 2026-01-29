using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortfolioApi.Data;
using PortfolioApi.DTOs;

namespace PortfolioApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ContactController : ControllerBase
{
    private readonly PortfolioDbContext _context;

    public ContactController(PortfolioDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<ContactDto>> Get()
    {
        var contact = await _context.Contacts.FirstOrDefaultAsync();
        if (contact == null) return NotFound();

        return new ContactDto(
            contact.Id, contact.Email, contact.Phone, contact.Location,
            contact.IntroTitle, contact.IntroText, contact.CtaText
        );
    }

    [HttpPut]
    public async Task<IActionResult> Update(UpdateContactDto dto)
    {
        var contact = await _context.Contacts.FirstOrDefaultAsync();
        if (contact == null) return NotFound();

        contact.Email = dto.Email;
        contact.Phone = dto.Phone;
        contact.Location = dto.Location;
        contact.IntroTitle = dto.IntroTitle;
        contact.IntroText = dto.IntroText;
        contact.CtaText = dto.CtaText;

        await _context.SaveChangesAsync();
        return NoContent();
    }
}

[ApiController]
[Route("api/social-links")]
public class SocialLinksController : ControllerBase
{
    private readonly PortfolioDbContext _context;

    public SocialLinksController(PortfolioDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<SocialLinkDto>>> GetAll()
    {
        var links = await _context.SocialLinks.OrderBy(l => l.DisplayOrder).ToListAsync();
        return links.Select(l => new SocialLinkDto(l.Id, l.Name, l.IconClass, l.Url, l.Color, l.DisplayOrder)).ToList();
    }

    [HttpPost]
    public async Task<ActionResult<SocialLinkDto>> Create(CreateSocialLinkDto dto)
    {
        var link = new Entities.SocialLink
        {
            Name = dto.Name,
            IconClass = dto.IconClass,
            Url = dto.Url,
            Color = dto.Color,
            DisplayOrder = dto.DisplayOrder
        };

        _context.SocialLinks.Add(link);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetAll), new SocialLinkDto(link.Id, link.Name, link.IconClass, link.Url, link.Color, link.DisplayOrder));
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, UpdateSocialLinkDto dto)
    {
        var link = await _context.SocialLinks.FindAsync(id);
        if (link == null) return NotFound();

        link.Name = dto.Name;
        link.IconClass = dto.IconClass;
        link.Url = dto.Url;
        link.Color = dto.Color;
        link.DisplayOrder = dto.DisplayOrder;

        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var link = await _context.SocialLinks.FindAsync(id);
        if (link == null) return NotFound();

        _context.SocialLinks.Remove(link);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
