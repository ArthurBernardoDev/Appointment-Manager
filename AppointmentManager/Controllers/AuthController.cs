using AppointmentManager.DTOs;
using AppointmentManager.Exceptions;
using AppointmentManager.Services;
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
            return Ok(token);
        }
        catch (InvalidCredentialsException)
        {
            return Unauthorized(new { message = "Invalid email or password" });
        }
    }
}