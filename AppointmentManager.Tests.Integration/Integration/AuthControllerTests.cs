using System.Net;
using System.Net.Http.Json;
using AppointmentManager.DTOs;
using Microsoft.AspNetCore.Mvc.Testing;
using Xunit;

namespace AppointmentManager.Tests.Integration.Integration
{
    public class AuthControllerTests(WebApplicationFactory<Program> factory) : IntegrationTestBase(factory)
    {
        [Fact]
        public async Task Register_ReturnsToken_WhenUserIsRegisteredSuccessfully()
        {
            // Arrange
            var dto = new RegisterDto
            {
                FullName = "Test User",
                Email = "test@example.com",
                Password = "password123",
                Role = "Patient"
            };

            // Act
            var response = await _client.PostAsJsonAsync("/api/auth/register", dto);

            // Assert
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);

            var content = await response.Content.ReadAsStringAsync();
            Assert.Contains("token", content);
        }

        [Fact]
        public async Task Register_ReturnsBadRequest_WhenUserAlreadyExists()
        {
            // Arrange
            var dto = new RegisterDto
            {
                FullName = "Existing User",
                Email = "existing@example.com",
                Password = "password123"
            };

            await _client.PostAsJsonAsync("/api/auth/register", dto);

            // Act 
            var response = await _client.PostAsJsonAsync("/api/auth/register", dto);

            // Assert
            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        }

        [Fact]
        public async Task Login_ReturnsToken_WhenCredentialsAreValid()
        {
            // Arrange 
            var uniqueEmail = $"test{Guid.NewGuid()}@example.com";
            var registerDto = new RegisterDto
            {
                Email = uniqueEmail,
                Password = "password",
                FullName = "Test User",
                Role = "Patient"
            };

            var registerResponse = await _client.PostAsJsonAsync("/api/auth/register", registerDto);
            var registerContent = await registerResponse.Content.ReadAsStringAsync();

            if (!registerResponse.IsSuccessStatusCode)
            {
                throw new Exception($"User registration failed: {registerContent}");
            }

            var loginDto = new LoginDto
            {
                Email = uniqueEmail,
                Password = "password"
            };

            // Act 
            var response = await _client.PostAsJsonAsync("/api/auth/login", loginDto);

            // Assert 
            response.EnsureSuccessStatusCode();
            var token = await response.Content.ReadAsStringAsync();
            Assert.False(string.IsNullOrWhiteSpace(token));
        }

        [Fact]
        public async Task Login_ReturnsUnauthorized_WhenCredentialsAreInvalid()
        {
            // Arrange
            var dto = new LoginDto
            {
                Email = "nonexistent@example.com",
                Password = "wrongpassword"
            };

            // Act
            var response = await _client.PostAsJsonAsync("/api/auth/login", dto);

            // Assert
            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }
    }
}