using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using Data;

var builder = WebApplication.CreateBuilder(args);

// Register HttpClient for making HTTP requests
builder.Services.AddHttpClient();

// Register services for controllers
builder.Services.AddControllers();

// Configure Swagger/OpenAPI for API documentation
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add configuration for PostgreSQL using the connection string from configuration
var configuration = builder.Configuration;
builder.Services.AddDbContext<ComponentContext>(options =>
    options.UseNpgsql(configuration.GetConnectionString("DefaultConnection")));

// Build the application
var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    // Enable Swagger and Swagger UI in development mode
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Use HTTPS redirection
app.UseHttpsRedirection();

// Use authorization middleware
app.UseAuthorization();

// Map controllers to endpoints
app.MapControllers();

// Run the application
app.Run();