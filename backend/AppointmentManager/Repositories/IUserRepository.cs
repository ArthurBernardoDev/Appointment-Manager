using AppointmentManager.Models;

namespace AppointmentManager.Repositories;

public interface IUserRepository
{
    Task<bool> EmailExists(string email);
    Task<User?> GetByEmail(string email);
    Task Add(User user);
    Task Update(User user); 
}