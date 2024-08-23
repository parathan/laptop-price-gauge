using Data;
using Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Models;
using API.Logic;
using Newtonsoft.Json.Linq;
using System.Runtime.InteropServices;
namespace API.Controllers;

[ApiController]
[Route("api/")]
public class ComponentsController : ControllerBase
{
    private readonly ComponentContext _context;
    private readonly HttpClient _httpClient;

    public ComponentsController(ComponentContext context, HttpClient httpClient) 
    {
        _context = context;
        _httpClient = httpClient;
    }

    // GET: api/allComponents
    [HttpGet("allComponents")]
    public async Task<ActionResult<IEnumerable<Component>>> GetComponents()
    {
        //TODO: #3 Have a cache
        //TODO: #4 Add pagination
        return await _context.Components.ToListAsync();
    }

    // Get: api/health/apicheck
    [HttpGet("health/apicheck")]
    public IActionResult CheckAPIHealth()
    {
        return Ok(new { Status = "API is running" });
    }

    // Get: api/health/dbcheck
    [HttpGet("health/dbcheck")]
    public async Task<IActionResult> CheckDatabaseHealth() 
    {
        try
        {
            var canCon = await _context.Database.CanConnectAsync();
            if (canCon)
            {
                return Ok(new { Status = "Database connection is active" });
            }
            else
            {
                return StatusCode(500, new { Status = "Couldn't connect to database" });
            }
        }
        catch (Exception e)
        {
            return StatusCode(500, new { Status = "Database connection check failed", Error = e.Message });
        }
    }

    // Get: api/computerScore
    [HttpPost("computerScore")]
    public async Task<IActionResult> GetComponentValue([FromBody] ComponentRequest request)
    {
        try
        {
            // Call the existing API endpoint
            var response = await _httpClient.GetStringAsync("http://localhost:5269/api/allComponents");
            var components = JArray.Parse(response);

            // Helper method to filter components
            IEnumerable<JToken> FilterComponents(string model, string brand)
            {
                return components
                    .Where(c => c["model"]?.ToString() == model && c["brand"]?.ToString() == brand);
            }
            
            // Helper method to get benchmarks from filtered components
            double GetBenchmarks(IEnumerable<JToken> filteredComponents)
            {
                return filteredComponents.Select(c => c["benchmark"]?.Value<int>() ?? 0).First();
            }

            // Filter and add components based on request criteria
            var GPU = FilterComponents(request.GPUModel, request.GPUBrand);
            var CPU = FilterComponents(request.CPUModel, request.CPUBrand);
            var RAM = FilterComponents(request.RAMModel, request.RAMBrand);
            var Storage = FilterComponents(request.StorageModel, request.StorageBrand); 
            
            // Extract benchmarks
            var gpuBenchmarks = GetBenchmarks(GPU);
            var cpuBenchmarks = GetBenchmarks(CPU);
            var ramBenchmarks = GetBenchmarks(RAM);
            var storageBenchmarks = GetBenchmarks(Storage);

            // Return the filtered components
            return Ok(new { GPU = BenchmarkScaler.ScaleBenchmark("GPU", gpuBenchmarks), CPU = BenchmarkScaler.ScaleBenchmark("CPU", cpuBenchmarks), RAM = BenchmarkScaler.ScaleBenchmark("RAM", ramBenchmarks), Storage = BenchmarkScaler.ScaleBenchmark("SSD", storageBenchmarks) });
        }
        catch (HttpRequestException ex)
        {
            // Handle the case where the request fails
            return StatusCode(500, $"Error fetching data: {ex.Message}");
        }
        catch (Exception ex)
        {
            // Handle other potential errors
            return StatusCode(500, $"An error occurred: {ex.Message}");
        }
    }

    
}