using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using Data;
using DotNetEnv;
using Microsoft.AspNetCore.Components.RenderTree;

var builder = WebApplication.CreateBuilder(args);

// Register HttpClient for making HTTP requests
builder.Services.AddHttpClient();

// Register services for controllers
builder.Services.AddControllers();

builder.Services.AddMemoryCache();

// Load environment variables
Env.Load();

var envProdBool = Environment.GetEnvironmentVariable("DATABASE") ?? "dev";
var useProdDb = envProdBool.Equals("prod");

string connectionString;


if (useProdDb) {
    Console.WriteLine("Using production database");
    
    var dbHost = Environment.GetEnvironmentVariable("PROD_DB_HOST") ?? "localhost";
    var dbPort = Environment.GetEnvironmentVariable("PROD_DB_PORT") ?? "5432";
    var dbDatabase = Environment.GetEnvironmentVariable("PROD_DB_DATABASE") ?? "Components";
    var dbUser = Environment.GetEnvironmentVariable("PROD_DB_USER") ?? "postgres";
    var dbPass = Environment.GetEnvironmentVariable("PROD_DB_PASS") ?? "testpassword";
    var ssl = Environment.GetEnvironmentVariable("PROD_DB_SSL") ?? "";

    connectionString = $"Host={dbHost};Port={dbPort};Database={dbDatabase};Username={dbUser};Password={dbPass}";
} 
else 
{
    Console.WriteLine("Using local database");
    var dbHost = Environment.GetEnvironmentVariable("DB_HOST") ?? "localhost";
    var dbPort = Environment.GetEnvironmentVariable("DB_PORT") ?? "5432";
    var dbDatabase = Environment.GetEnvironmentVariable("DB_DATABASE") ?? "Components";
    var dbUser = Environment.GetEnvironmentVariable("DB_USER") ?? "postgres";
    var dbPass = Environment.GetEnvironmentVariable("DB_PASS") ?? "testpassword";
    
    connectionString = $"Host={dbHost};Port={dbPort};Database={dbDatabase};Username={dbUser};Password={dbPass}";
}


builder.Configuration["ConnectionStrings:DefaultConnection"] = connectionString;

// Configure CORS to allow localhost:3000
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost3000", policy =>
    {
        policy.WithOrigins("http://localhost:3000") // Allow this origin
              .AllowAnyHeader()                    // Allow any headers
              .AllowAnyMethod();                   // Allow any HTTP methods
    });
});

// Configure Swagger/OpenAPI for API documentation
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add configuration for PostgreSQL using the connection string from configuration
var configuration = builder.Configuration;
builder.Services.AddDbContext<ComponentContext>(options =>
    options.UseNpgsql(configuration.GetConnectionString("DefaultConnection")));

builder.WebHost.ConfigureKestrel(options =>
{
    options.ListenAnyIP(5269); // Bind to 0.0.0.0:5269
});

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

// Enable CORS
app.UseCors("AllowLocalhost3000");

// Use authorization middleware
app.UseAuthorization();

// Map controllers to endpoints
app.MapControllers();

// Run the application
app.Run();