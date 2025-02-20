using AppointmentManager.Models;
using Microsoft.EntityFrameworkCore;

namespace AppointmentManager.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Dentist> Dentists { get; set; }
        public DbSet<Specialty> Specialties { get; set; }
        public DbSet<DentistSpecialty> DentistSpecialties { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<DentistSpecialty>()
                .HasKey(ds => new { ds.DentistId, ds.SpecialtyId });

            modelBuilder.Entity<DentistSpecialty>()
                .HasOne(ds => ds.Dentist)
                .WithMany(d => d.DentistSpecialties)
                .HasForeignKey(ds => ds.DentistId);

            modelBuilder.Entity<DentistSpecialty>()
                .HasOne(ds => ds.Specialty)
                .WithMany(s => s.DentistSpecialties)
                .HasForeignKey(ds => ds.SpecialtyId);
            
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Specialty>().HasData(
                new Specialty { Id = 1, Name = "Ortodontia" },
                new Specialty { Id = 2, Name = "Endodontia" },
                new Specialty { Id = 3, Name = "Periodontia" },
                new Specialty { Id = 4, Name = "Implantodontia" },
                new Specialty { Id = 5, Name = "Dentística" }
            );
        }
    }
}