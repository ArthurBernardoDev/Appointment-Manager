namespace AppointmentManager.Services;
using AppointmentManager.Models;

public interface IJwtService
{
    string GenerateToken(User user);
    string GenerateResetPasswordToken(string email);
}