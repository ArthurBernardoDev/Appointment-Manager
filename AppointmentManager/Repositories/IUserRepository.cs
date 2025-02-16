using AppointmentManager.Models;

public interface IUserRepository
{
    Task<bool> EmailExists(string email);
    Task<User?> GetByEmail(string email);
    Task Add(User user);
}