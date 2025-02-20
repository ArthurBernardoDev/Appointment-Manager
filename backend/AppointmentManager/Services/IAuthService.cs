namespace AppointmentManager.Services;
using AppointmentManager.DTOs;

public interface IAuthService
{
    Task<string> Register(RegisterDto dto);
    Task<string?> Login(LoginDto dto);
    Task<bool> ForgotPassword(string email);
    Task<bool> ResetPassword(string token, string newPassword);
}