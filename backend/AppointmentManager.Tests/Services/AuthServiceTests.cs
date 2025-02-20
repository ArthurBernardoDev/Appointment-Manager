using AppointmentManager.DTOs;
using AppointmentManager.Exceptions;
using AppointmentManager.Models;
using AppointmentManager.Repositories;
using AppointmentManager.Services;
using AppointmentManager.Services.Ipml;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Moq;
using Xunit;

namespace AppointmentManager.Tests.Services;

public class AuthServiceTests
{
    private readonly Mock<IUserRepository> _mockUserRepository;
    private readonly Mock<JwtService> _mockJwtService;
    private readonly Mock<IEmailService> _mockEmailService;
    private readonly Mock<IConfiguration> _mockConfig;
    private readonly Mock<ILogger<AuthService>> _mockLogger;
    private readonly AuthService _authService;

    public AuthServiceTests()
    {
        _mockUserRepository = new Mock<IUserRepository>();
        _mockJwtService = new Mock<JwtService>(new ConfigurationBuilder().Build());
        _mockEmailService = new Mock<IEmailService>();
        _mockConfig = new Mock<IConfiguration>();
        _mockLogger = new Mock<ILogger<AuthService>>();

        _authService = new AuthService(
            _mockUserRepository.Object,
            _mockJwtService.Object,
            _mockEmailService.Object,
            _mockConfig.Object,
            _mockLogger.Object
        );
    }

    [Fact]
    public async Task Register_ThrowsException_WhenUserAlreadyExists()
    {
        // Arrange
        _mockUserRepository
            .Setup(repo => repo.EmailExists("test@example.com"))
            .ReturnsAsync(true);

        var dto = new RegisterDto
        {
            Email = "test@example.com",
            Password = "password",
            FullName = "John Doe",
            Role = "Patient"
        };

        // Act & Assert
        await Assert.ThrowsAsync<UserAlreadyExistsException>(() => _authService.Register(dto));
    }

    [Fact]
    public async Task Register_CreatesUser_WhenUserDoesNotExist()
    {
        // Arrange
        _mockUserRepository
            .Setup(repo => repo.EmailExists("test@example.com"))
            .ReturnsAsync(false);

        _mockUserRepository
            .Setup(repo => repo.Add(It.IsAny<User>()))
            .Returns(Task.CompletedTask);

        _mockJwtService
            .Setup(jwt => jwt.GenerateToken(It.IsAny<User>()))
            .Returns("mocked_token");

        var dto = new RegisterDto
        {
            Email = "test@example.com",
            Password = "password",
            FullName = "John Doe",
            Role = "Patient"
        };

        // Act
        var result = await _authService.Register(dto);

        // Assert
        Assert.NotNull(result);
        Assert.Equal("mocked_token", result);
        _mockUserRepository.Verify(repo => repo.Add(It.IsAny<User>()), Times.Once);
    }

    [Fact]
    public async Task Login_ReturnsNull_WhenUserDoesNotExist()
    {
        // Arrange
        _mockUserRepository
            .Setup(repo => repo.GetByEmail(It.IsAny<string>()))
            .ReturnsAsync((User?)null); 

        var dto = new LoginDto { Email = "test@example.com", Password = "password" };

        // Act
        var result = await _authService.Login(dto);

        // Assert
        Assert.Null(result); 
    }
    
    [Fact]
    public async Task Login_ReturnsNull_WhenPasswordIsIncorrect()
    {
        // Arrange
        var user = new User
        {
            Email = "test@example.com",
            PasswordHash = BCrypt.Net.BCrypt.HashPassword("correctpassword"), 
            FullName = "John Doe",
            Role = "Patient"
        };

        _mockUserRepository.Setup(repo => repo.GetByEmail("test@example.com")).ReturnsAsync(user);

        var dto = new LoginDto { Email = "test@example.com", Password = "wrongpassword" };

        // Act
        var result = await _authService.Login(dto);

        // Assert
        Assert.Null(result);
    }
    

    [Fact]
    public async Task Login_ReturnsToken_WhenCredentialsAreValid()
    {
        // Arrange
        var user = new User
        {
            Email = "test@example.com",
            PasswordHash = BCrypt.Net.BCrypt.HashPassword("password"),
            FullName = "John Doe",
            Role = "Patient"
        };

        _mockUserRepository
            .Setup(repo => repo.GetByEmail("test@example.com"))
            .ReturnsAsync(user);

        _mockJwtService
            .Setup(jwt => jwt.GenerateToken(user))
            .Returns("mocked_token");

        var dto = new LoginDto { Email = "test@example.com", Password = "password" };

        // Act
        var result = await _authService.Login(dto);

        // Assert
        Assert.NotNull(result);
        Assert.Equal("mocked_token", result);
    }

    [Fact]
    public async Task ForgotPassword_SendsEmail_WhenUserExists()
    {
        // Arrange
        _mockUserRepository
            .Setup(repo => repo.GetByEmail("test@example.com"))
            .ReturnsAsync(new User { Email = "test@example.com" });

        _mockJwtService
            .Setup(jwt => jwt.GenerateResetPasswordToken("test@example.com"))
            .Returns("mocked_reset_token");

        _mockEmailService
            .Setup(email => email.SendPasswordResetEmail(It.IsAny<string>(), It.IsAny<string>()))
            .Returns(Task.CompletedTask);

        // Act
        var result = await _authService.ForgotPassword("test@example.com");

        // Assert
        Assert.True(result);
        _mockEmailService.Verify(email => email.SendPasswordResetEmail("test@example.com", It.IsAny<string>()), Times.Once);
    }
    
}