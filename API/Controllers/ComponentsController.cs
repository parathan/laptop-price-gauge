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

    // Get: api/computerScore/name
    [HttpPost("computerScore/name")]
    public async Task<IActionResult> GetComponentValuebyName([FromBody] ComponentRequest request)
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
            var Category = request.Category;
            var StorageType = request.StorageType;

            // Extract benchmarks
            var gpuBenchmarks = GetBenchmarks(GPU);
            var cpuBenchmarks = GetBenchmarks(CPU);
            var ramBenchmarks = GetBenchmarks(RAM);
            var storageBenchmarks = GetBenchmarks(Storage);

            var scaledGPU = BenchmarkScaler.ScaleBenchmark("GPU", gpuBenchmarks);
            var scaledCPU = BenchmarkScaler.ScaleBenchmark("CPU", cpuBenchmarks);
            var scaledRAM = BenchmarkScaler.ScaleBenchmark("RAM", ramBenchmarks);
            var scaledStorage = BenchmarkScaler.ScaleBenchmark(StorageType, storageBenchmarks);
            var totalBenchmark = CategoryBenchmarkCalculator.CalculateCategoryBenchmark(scaledCPU, scaledGPU, scaledRAM, scaledStorage, Category);

            // Return the filtered components
            return Ok(new { GPU = scaledGPU, CPU = scaledCPU, RAM = scaledRAM, Storage = scaledStorage, totalBenchmark = totalBenchmark});
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

    // Post: api/computerScore/benchmark
    [HttpPost("computerScore/benchmark")]
    public IActionResult GetComponentValuebyBenchmark([FromBody] BenchmarkRequest request)
    {
        try
        {
            // Extract benchmarks
            var gpuBenchmarks = request.GPU;
            var cpuBenchmarks = request.CPU;
            var ramBenchmarks = request.RAM;
            var storageBenchmarks = request.Storage;

            var Category = request.Category;
            var StorageType = request.StorageType;

            var scaledGPU = BenchmarkScaler.ScaleBenchmark("GPU", gpuBenchmarks);
            var scaledCPU = BenchmarkScaler.ScaleBenchmark("CPU", cpuBenchmarks);
            var scaledRAM = BenchmarkScaler.ScaleBenchmark("RAM", ramBenchmarks);
            var scaledStorage = BenchmarkScaler.ScaleBenchmark(StorageType, storageBenchmarks);
            var totalBenchmark = CategoryBenchmarkCalculator.CalculateCategoryBenchmark(scaledCPU, scaledGPU, scaledRAM, scaledStorage, Category);

            // Return the filtered components
            return Ok(new { GPU = scaledGPU, CPU = scaledCPU, RAM = scaledRAM, Storage = scaledStorage, totalBenchmark = totalBenchmark});
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