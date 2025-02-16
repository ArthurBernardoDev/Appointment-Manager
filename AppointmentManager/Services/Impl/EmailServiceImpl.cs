using System.Net;
using System.Net.Mail;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Logging;

namespace AppointmentManager.Services.Impl;

public class EmailServiceImpl : IEmailService
{
    private readonly SmtpSettings _smtpSettings;
    private readonly ILogger<EmailServiceImpl> _logger;

    public EmailServiceImpl(IOptions<SmtpSettings> smtpSettings, ILogger<EmailServiceImpl> logger)
    {
        _smtpSettings = smtpSettings.Value;
        _logger = logger;
    }

    public async Task SendPasswordResetEmail(string toEmail, string resetLink)
    {
        try
        {
            using var smtpClient = new SmtpClient(_smtpSettings.Host, _smtpSettings.Port);
            smtpClient.Credentials = new NetworkCredential(_smtpSettings.User, _smtpSettings.Pass);
            smtpClient.EnableSsl = true;

            var mailMessage = new MailMessage
            {
                From = new MailAddress(_smtpSettings.From),
                Subject = "Password Reset Request",
                Body = $"Click the link to reset your password: <a href='{resetLink}'>Reset Password</a>",
                IsBodyHtml = true
            };

            mailMessage.To.Add(toEmail);

            await smtpClient.SendMailAsync(mailMessage);
            _logger.LogInformation($"Password reset email sent to {toEmail}");
        }
        catch (Exception ex)
        {
            _logger.LogError($"Failed to send password reset email to {toEmail}: {ex.Message}");
            throw;
        }
    }
}