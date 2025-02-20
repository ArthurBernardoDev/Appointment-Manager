using System.Net;
using System.Net.Mail;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Logging;

namespace AppointmentManager.Services.Impl;

public class EmailService : IEmailService
{
    private readonly SmtpSettings _smtpSettings;
    private readonly ILogger<EmailService> _logger;

    public EmailService(IOptions<SmtpSettings> smtpSettings, ILogger<EmailService> logger)
    {
        _smtpSettings = smtpSettings.Value;
        _logger = logger;
    }

    public async Task SendPasswordResetEmail(string toEmail, string resetLink)
    {
        try
        {
            if (string.IsNullOrWhiteSpace(toEmail))
            {
                _logger.LogError("O e-mail para redefinição de senha está vazio!");
                throw new ArgumentException("O endereço de e-mail não pode ser vazio.", nameof(toEmail));
            }

            _logger.LogInformation($"Tentando enviar um e-mail de redefinição para: {toEmail}");

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
            _logger.LogInformation($"E-mail de redefinição de senha enviado para {toEmail}");
        }
        catch (ArgumentException ex)
        {
            _logger.LogError($" Erro de argumento: {ex.Message}");
            throw;
        }
        catch (Exception ex)
        {
            _logger.LogError($"Falha ao enviar o e-mail de redefinição de senha para {toEmail}: {ex.Message}");
            throw;
        }
    }
}