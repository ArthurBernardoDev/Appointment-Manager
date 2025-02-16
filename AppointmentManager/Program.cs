using Microsoft.AspNetCore.Builder;
using AppointmentManager.Repositories;
using AppointmentManager.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

// Configurando SQL Server com Entity Framework Core
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<UserRepository>();
builder.Services.AddScoped<JwtService>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<AuthService>();

var app = builder.Build();

app.UseAuthorization();
app.MapControllers();
app.Run();