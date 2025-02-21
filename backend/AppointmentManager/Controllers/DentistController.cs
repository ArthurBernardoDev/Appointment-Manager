using System.Security.Claims;
using AppointmentManager.DTOs;
using AppointmentManager.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AppointmentManager.Controllers
{
    [Route("api/dentists")]
    [ApiController]
    public class DentistController : ControllerBase
    {
        private readonly IDentistService _dentistService;

        public DentistController(IDentistService dentistService)
        {
            _dentistService = dentistService;
        }
            
        [HttpPost("register")]
        [Authorize(Policy = "DentistOnly")]
        public async Task<IActionResult> RegisterDentist([FromForm] DentistDto dentistDto, [FromForm] IFormFile? file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest(new { message = "A imagem do dentista é obrigatória." });
            }
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
                return Unauthorized("Usuário não autenticado.");

            var userId = int.Parse(userIdClaim.Value);
            using var stream = new MemoryStream();
            await file.CopyToAsync(stream);

            await _dentistService.RegisterDentist(
                userId, dentistDto, stream, file.FileName, file.ContentType
            );

            return Ok("✅ Dentista registrado com sucesso!");
        }

        [HttpGet("check-profile")]
        [Authorize(Policy = "DentistOnly")]
        public async Task<IActionResult> CheckProfileCompletion()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
                return Unauthorized("Usuário não autenticado.");

            var userId = int.Parse(userIdClaim.Value);
            var isProfileComplete = await _dentistService.IsProfileComplete(userId);

            return Ok(new { isProfileComplete });
        }
  }   
}
