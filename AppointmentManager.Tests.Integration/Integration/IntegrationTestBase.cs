using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Xunit;

namespace AppointmentManager.Tests.Integration.Integration
{
    public class IntegrationTestBase : IClassFixture<WebApplicationFactory<Program>>
    {
        protected readonly HttpClient _client;

        public IntegrationTestBase(WebApplicationFactory<Program> factory)
        {
            _client = factory.WithWebHostBuilder(builder =>
            {
                builder.UseEnvironment("Testing"); // 🚀 Define o ambiente de teste

                builder.ConfigureServices(services =>
                {
                    // Remover o DbContext existente
                    var descriptor = services.SingleOrDefault(
                        d => d.ServiceType == typeof(DbContextOptions<AppDbContext>));

                    if (descriptor != null)
                    {
                        services.Remove(descriptor);
                    }

                    // Adicionar um banco InMemory para testes
                    services.AddDbContext<AppDbContext>(options =>
                        options.UseInMemoryDatabase("TestDatabase"));
                });
            }).CreateClient();
        }
    }
}