using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using AppointmentManager.Exceptions;
using Microsoft.IdentityModel.Tokens;

namespace AppointmentManager.Services;
using AppointmentManager.DTOs;
using AppointmentManager.Models;

public class AuthService
{
    private readonly ILogger<AuthService> _logger;
    private readonly IUserRepository _userRepository;
    private readonly JwtService _jwtService;
    private readonly IEmailService _emailService;
    private readonly IConfiguration _config;

    public AuthService(IUserRepository userRepository, JwtService jwtService, IEmailService emailService, IConfiguration config, ILogger<AuthService> logger)
    {
        _userRepository = userRepository;
        _jwtService = jwtService;
        _emailService = emailService;
        _config = config;
        _logger = logger;
    }

    public async Task<string> Register(RegisterDto dto)
    {
        if (await _userRepository.EmailExists(dto.Email))
        {
            throw new UserAlreadyExistsException(dto.Email);
        }

        var hashedPassword = HashPassword(dto.Password);

        var user = new User 
        { 
            FullName = dto.FullName, 
            Email = dto.Email, 
            PasswordHash = hashedPassword, 
            Role = dto.Role 
        };

        await _userRepository.Add(user);
        return _jwtService.GenerateToken(user);
    }

    public async Task<string?> Login(LoginDto dto)
    {
        _logger.LogInformation($"🔹 Login attempt for: {dto.Email}");

        var user = await _userRepository.GetByEmail(dto.Email);
        if (user == null)
        {
            _logger.LogWarning("❌ User not found!");
            return null;
        }

        _logger.LogInformation($"🔹 Stored password hash: {user.PasswordHash}");
        _logger.LogInformation($"🔹 Password entered: {dto.Password}");

        if (!VerifyPassword(dto.Password, user.PasswordHash))
        {
            _logger.LogWarning("❌ Password does not match!");
            return null;
        }

        _logger.LogInformation("✅ Password matches! Generating token...");
        return _jwtService.GenerateToken(user);
    }

    private string HashPassword(string password)
    {
        return BCrypt.Net.BCrypt.HashPassword(password, workFactor: 12);
    }

    private bool VerifyPassword(string password, string storedHash)
    {
        return BCrypt.Net.BCrypt.Verify(password, storedHash);
    }
    
    public async Task<bool> ForgotPassword(string email)
    {
        var user = await _userRepository.GetByEmail(email);
        if (user == null) return false;

        var resetToken = _jwtService.GenerateResetPasswordToken(email);
        var resetLink = $"https://seusite.com/reset-password?token={resetToken}";

        await _emailService.SendPasswordResetEmail(email, resetLink);
        return true;
    }
    
    public async Task<bool> ResetPassword(string token, string newPassword)
    {
        Console.WriteLine("🔹 ResetPassword method started...");

        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_config["Jwt:Key"] ?? throw new Exception("JWT Key not configured"));

        try
        {
            var parameters = new TokenValidationParameters()
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateLifetime = true
            };

            Console.WriteLine("🔹 Validating token...");
            var principal = tokenHandler.ValidateToken(token, parameters, out SecurityToken validatedToken);
            Console.WriteLine($"✅ Token validated: {validatedToken}");

            var email = principal.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
            Console.WriteLine($"🔹 Extracted email from token: {email}");

            if (email == null)
            {
                Console.WriteLine("❌ Email not found in token!");
                return false;
            }

            Console.WriteLine("🔹 Searching user in database...");
            var user = await _userRepository.GetByEmail(email);
            if (user == null)
            {
                Console.WriteLine("❌ User not found!");
                return false;
            }

            Console.WriteLine("✅ User found! Updating password...");
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(newPassword);
            await _userRepository.Update(user);

            Console.WriteLine("✅ Password updated successfully!");
            return true;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"❌ Exception occurred: {ex.Message}");
            return false;
        }
    }
}