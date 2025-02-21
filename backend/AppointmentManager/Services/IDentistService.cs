using AppointmentManager.DTOs;
using AppointmentManager.Models;

namespace AppointmentManager.Services;

public interface IDentistService
{
    Task<Dentist> RegisterDentist(int userId, DentistDto dentistDto, Stream fileStream, string fileName,
        string contentType);
    Task<bool> IsProfileComplete(int userId);
}