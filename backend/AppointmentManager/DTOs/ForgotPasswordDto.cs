using System.ComponentModel.DataAnnotations;

namespace AppointmentManager.DTOs;

public class ForgotPasswordDto
{
    [Required(ErrorMessage = "O e-mail é obrigatório.")]
    [EmailAddress(ErrorMessage = "O e-mail informado não é válido.")]
    public string Email { get; set; } = string.Empty;
}