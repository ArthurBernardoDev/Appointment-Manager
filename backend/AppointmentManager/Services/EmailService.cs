namespace AppointmentManager.Services;

public interface IEmailService
{
    Task SendPasswordResetEmail(string toEmail, string resetLink);
}