using AppointmentManager.Data;
using AppointmentManager.Models;
using Microsoft.EntityFrameworkCore;

namespace AppointmentManager.Repositories;

public class DentistRepository
{
    private readonly AppDbContext _context;

    public DentistRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Dentist> AddDentist(Dentist dentist, List<int> specialtyIds)
    {
        _context.Dentists.Add(dentist);
        await _context.SaveChangesAsync();

        foreach (var dentistSpecialty in specialtyIds.Select(specialtyId => new DentistSpecialty
                 {
                     DentistId = dentist.Id,
                     SpecialtyId = specialtyId
                 }))
        {
            _context.DentistSpecialties.Add(dentistSpecialty);
        }

        await _context.SaveChangesAsync();
        return dentist;
    }
    
    
    public async Task<Dentist?> GetDentistByUserId(int userId)
    {
        return await _context.Dentists
            .Include(d => d.DentistSpecialties)
            .FirstOrDefaultAsync(d => d.UserId == userId);
    }

    public async Task<List<Specialty>> GetSpecialties()
    {
        return await _context.Specialties.ToListAsync();
    }
}