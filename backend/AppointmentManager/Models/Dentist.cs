using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AppointmentManager.Models
{
    public class Dentist
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Photo { get; set; } = string.Empty;

        [Required]
        public string ClinicAddress { get; set; } = string.Empty;

        [Required]
        public string Description { get; set; } = string.Empty;

        public bool IsProfileComplete { get; set; } = false;

        [ForeignKey("User")]
        public int UserId { get; set; }
        public User User { get; set; } = null!;

        public List<DentistSpecialty> DentistSpecialties { get; set; } = new();
    }
}