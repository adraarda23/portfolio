using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Net.Mail;

namespace PortfolioApi.Controllers;

[ApiController]
[Route("[controller]")]
public class EmailController : ControllerBase
{
    private readonly IConfiguration _configuration;

    public EmailController(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    [HttpPost("send")]
    public async Task<IActionResult> SendEmail([FromBody] ContactFormDto dto)
    {
        if (string.IsNullOrEmpty(dto.Name) || string.IsNullOrEmpty(dto.Email) || string.IsNullOrEmpty(dto.Message))
        {
            return BadRequest(new { message = "Name, email, and message are required" });
        }

        try
        {
            var smtpSettings = _configuration.GetSection("Smtp");
            var host = smtpSettings["Host"];
            var port = int.Parse(smtpSettings["Port"] ?? "587");
            var username = smtpSettings["Username"];
            var password = smtpSettings["Password"];
            var fromEmail = smtpSettings["FromEmail"];
            var toEmail = smtpSettings["ToEmail"];

            using var client = new SmtpClient(host, port)
            {
                Credentials = new NetworkCredential(username, password),
                EnableSsl = true
            };

            var mailMessage = new MailMessage
            {
                From = new MailAddress(fromEmail!, "Portfolio Contact Form"),
                Subject = $"Portfolio Contact: {dto.Subject ?? "New Message"} - from {dto.Name}",
                Body = $@"
New contact form submission from your portfolio website:

Name: {dto.Name}
Email: {dto.Email}
Subject: {dto.Subject ?? "N/A"}

Message:
{dto.Message}

---
Sent from your portfolio website contact form
",
                IsBodyHtml = false
            };

            mailMessage.To.Add(toEmail!);
            mailMessage.ReplyToList.Add(new MailAddress(dto.Email, dto.Name));

            await client.SendMailAsync(mailMessage);

            return Ok(new { message = "Email sent successfully!" });
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Email error: {ex.Message}");
            return StatusCode(500, new { message = "Failed to send email. Please try again later." });
        }
    }
}

public record ContactFormDto(string Name, string Email, string? Subject, string Message);
