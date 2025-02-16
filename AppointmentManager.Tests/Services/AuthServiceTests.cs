using AppointmentManager.DTOs;
using Moq;
using Xunit;
using AppointmentManager.Services;
using AppointmentManager.Repositories;
using AppointmentManager.Models;
using AppointmentManager.Exceptions;
using Microsoft.Extensions.Configuration;

public class AuthServiceTests
{
    private readonly Mock<IUserRepository> _mockUserRepository;
    private readonly Mock<JwtService> _mockJwtService;
    private readonly AuthService _authService;

    public AuthServiceTests()
    {
        _mockUserRepository = new Mock<IUserRepository>();
        _mockJwtService = new Mock<JwtService>(new ConfigurationBuilder().Build());
        _authService = new AuthService(_mockUserRepository.Object, _mockJwtService.Object);
    }

    [Fact]
    public async Task Register_ThrowsException_WhenUserAlreadyExists()
    {
        _mockUserRepository.Setup(repo => repo.EmailExists("test@example.com")).ReturnsAsync(true);

        var dto = new RegisterDto() { Email = "test@example.com", Password = "password", FullName = "John Doe" };

        await Assert.ThrowsAsync<UserAlreadyExistsException>(() => _authService.Register(dto));
    }

    [Fact]
    public async Task Login_ThrowsException_WhenCredentialsAreInvalid()
    {
        _mockUserRepository.Setup(repo => repo.GetByEmail("test@example.com")).ReturnsAsync((User?)null);

        var dto = new LoginDto { Email = "test@example.com", Password = "password" };

        await Assert.ThrowsAsync<InvalidCredentialsException>(() => _authService.Login(dto));
    }
}