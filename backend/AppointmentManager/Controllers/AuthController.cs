using AppointmentManager.DTOs;
using AppointmentManager.Exceptions;
using AppointmentManager.Services;
using AppointmentManager.Services.Ipml;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AppointmentManager.Controllers;

[Route("api/auth")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly AuthService _authService;

    public AuthController(AuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto dto)
    {
        try
        {
            var token = await _authService.Register(dto);
            return Ok(new { token });
        }
        catch (UserAlreadyExistsException)
        {
            return BadRequest(new { message = "User already exists" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = ex.Message });
        }
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto dto)
    {
        try
        {
            var token = await _authService.Login(dto);
            return Ok(new { token });
        }
        catch (InvalidCredentialsException)
        {
            return Unauthorized(new { message = "Invalid email or password" });
        }
    }
    
    [HttpPost("forgot-password")]
    public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Email))
        {
            return BadRequest("O e-mail é obrigatório.");
        }

        var result = await _authService.ForgotPassword(dto.Email);

        if (!result)
        {
            return NotFound("Usuário não encontrado.");
        }

        return Ok(new { message = "Se o e-mail estiver cadastrado, um link de recuperação foi enviado." });
    }
    
    [HttpPost("reset-password")]
    public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDto dto)
    {
        var result = await _authService.ResetPassword(dto.Token, dto.NewPassword);
        if (!result)
        {
            return BadRequest(new { message = "Invalid or expired token." });
        }
        return Ok(new { message = "Password successfully reset." });
    }
    [HttpGet("validate-token")]
    [Authorize]
    public IActionResult ValidateToken()
    {
        return Ok(new { message = "Token válido" });
    }
}