using System.ComponentModel.DataAnnotations;

namespace AppointmentManager.DTOs;

public class DentistDto
{
    [Required]
    public string ClinicAddress { get; set; } = string.Empty;

    [Required]
    public string Description { get; set; } = string.Empty;

    [Required]
    public List<int> SpecialtyIds { get; set; } = new();
}