using AppointmentManager.DTOs;
using AppointmentManager.Services;
using Microsoft.AspNetCore.Mvc;

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
            var token = await _authService.Register(dto);
            return Ok(new { Token = token });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            var token = await _authService.Login(dto);
            return Ok(new { Token = token });
        }
    }
