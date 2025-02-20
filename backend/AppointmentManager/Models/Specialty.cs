using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AppointmentManager.Models
{
    public class Specialty
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(255)]
        public string Name { get; set; }

        public List<DentistSpecialty> DentistSpecialties { get; set; } = new();
    }
}