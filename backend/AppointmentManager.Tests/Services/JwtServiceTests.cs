using AppointmentManager.Services.Ipml;

namespace AppointmentManager.Tests;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using Xunit;
using AppointmentManager.Services;
using AppointmentManager.Exceptions;
using AppointmentManager.Models;

public class JwtServiceTests
{
    private readonly IConfiguration _configuration;

    public JwtServiceTests()
    {
        var inMemorySettings = new Dictionary<string, string> {
            {"Jwt:Key", "ThisIsASuperSecretKeyWithAtLeast32Chars!"},
            {"Jwt:Issuer", "AppointmentManager"},
            {"Jwt:Audience", "AppointmentManagerUsers"}
        };

        _configuration = new ConfigurationBuilder().AddInMemoryCollection(inMemorySettings).Build();
    }

    [Fact]
    public void GenerateToken_ThrowsException_WhenKeyIsMissing()
    {
        var configWithoutKey = new ConfigurationBuilder().Build();
        var jwtService = new JwtService(configWithoutKey);

        Assert.Throws<JwtKeyNotFoundException>(() => jwtService.GenerateToken(new User()));
    }

    [Fact]
    public void GenerateToken_ReturnsValidToken()
    {
        var jwtService = new JwtService(_configuration);
        var token = jwtService.GenerateToken(new User { Id = 1, Email = "test@example.com", Role = "Patient" });

        Assert.NotNull(token);
        Assert.NotEmpty(token);
    }
}