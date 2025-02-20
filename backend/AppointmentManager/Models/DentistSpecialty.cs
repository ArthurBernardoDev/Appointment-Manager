namespace AppointmentManager.Models
{
    public class DentistSpecialty
    {
        public int DentistId { get; set; }
        public Dentist Dentist { get; set; }

        public int SpecialtyId { get; set; }
        public Specialty Specialty { get; set; }
    }
}