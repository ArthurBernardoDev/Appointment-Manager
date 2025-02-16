using System.Security.Cryptography;
using System.Text;
using AppointmentManager.Exceptions;

namespace AppointmentManager.Services;
using AppointmentManager.DTOs;
using AppointmentManager.Models;

public class AuthService
{
    private readonly IUserRepository _userRepository;
    private readonly JwtService _jwtService;

    public AuthService(IUserRepository userRepository, JwtService jwtService)
    {
        _userRepository = userRepository;
        _jwtService = jwtService;
    }

    public async Task<string> Register(RegisterDto dto)
    {
        if (await _userRepository.EmailExists(dto.Email))
        {
            throw new UserAlreadyExistsException(dto.Email);
        }

        var hashedPassword = HashPassword(dto.Password);
        var user = new User { FullName = dto.FullName, Email = dto.Email, PasswordHash = hashedPassword, Role = dto.Role };

        await _userRepository.Add(user);
        return _jwtService.GenerateToken(user);
    }

    public async Task<string> Login(LoginDto dto)
    {
        var user = await _userRepository.GetByEmail(dto.Email);

        if (user is null || !VerifyPassword(dto.Password, user.PasswordHash))
        {
            throw new InvalidCredentialsException();
        }

        return _jwtService.GenerateToken(user);
    }

    private string HashPassword(string password)
    {
        using var sha256 = SHA256.Create();
        var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
        return Convert.ToBase64String(hashedBytes);
    }

    private bool VerifyPassword(string password, string storedHash)
    {
        return HashPassword(password) == storedHash;
    }
}