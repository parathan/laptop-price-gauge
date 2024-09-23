using Data;
using Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Models;
using API.Logic;
using API.Validators;
using Newtonsoft.Json.Linq;
using System.Runtime.InteropServices;
using API.Constants;
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

    [HttpGet("groupedComponents")]
    public async Task<ActionResult> GetGroupedComponents()
    {
        var groupedComponents = await _context.Components
            .GroupBy(c => c.Type)
            .ToDictionaryAsync(
                g => g.Key,
                g => g.ToList()
            );

        return Ok(new { components = groupedComponents, categories = Categories.AllCategories });
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
            var gpuBenchmarks = Math.Round(GetBenchmarks(GPU), 1);
            var cpuBenchmarks = Math.Round(GetBenchmarks(CPU), 1);
            var ramBenchmarks = Math.Round(GetBenchmarks(RAM), 1);
            var storageBenchmarks = Math.Round(GetBenchmarks(Storage), 1);

            var validator = new RequestValidator();
            var validationResult = validator.ValidateBenchmark(gpuBenchmarks, cpuBenchmarks, ramBenchmarks, StorageType, storageBenchmarks);
            if(!validationResult.IsValid)
            {
                return BadRequest(validationResult.ErrMessage);
            }

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
            var gpuBenchmarks = Math.Round(request.GPU, 1);
            var cpuBenchmarks = Math.Round(request.CPU, 1);
            var ramBenchmarks = Math.Round(request.RAM, 1);
            var storageBenchmarks = Math.Round(request.Storage, 1);

            var validator = new RequestValidator();
            var validationResult = validator.ValidateBenchmark(gpuBenchmarks, cpuBenchmarks, ramBenchmarks, request.StorageType, storageBenchmarks);
            if (!validationResult.IsValid)
            {
                return BadRequest(validationResult.ErrMessage);
            }

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

    // Post: api/computerScore/benchmark/two
    [HttpPost("computerScore/benchmark/two")]
    public IActionResult GetTwoComponentValuebyBenchmark([FromBody] TwoBenchmarkRequest request)
    {
        try
        {
            // Extract benchmarks
            var gpu1Benchmarks = Math.Round(request.GPU_1, 1);
            var cpu1Benchmarks = Math.Round(request.CPU_1, 1);
            var ram1Benchmarks = Math.Round(request.RAM_1, 1);
            var storage1Benchmarks = request.Storage_1;

            var gpu2Benchmarks = Math.Round(request.GPU_2, 1);
            var cpu2Benchmarks = Math.Round(request.CPU_2, 1);
            var ram2Benchmarks = Math.Round(request.RAM_2, 1);
            var storage2Benchmarks = request.Storage_2;

            var Category = request.Category;
            var StorageType = request.StorageType;

            var validator = new RequestValidator();
            var validationResult = validator.ValidateTwoBenchmark(gpu1Benchmarks, cpu1Benchmarks, ram1Benchmarks, storage1Benchmarks, gpu2Benchmarks, cpu2Benchmarks, ram2Benchmarks, storage2Benchmarks, StorageType);
            if (!validationResult.IsValid)
            {
                return BadRequest(validationResult.ErrMessage);
            }

            var scaled1GPU = BenchmarkScaler.ScaleBenchmark("GPU", gpu1Benchmarks);
            var scaled1CPU = BenchmarkScaler.ScaleBenchmark("CPU", cpu1Benchmarks);
            var scaled1RAM = BenchmarkScaler.ScaleBenchmark("RAM", ram1Benchmarks);
            var scaled1Storage = StorageCalculator.CalculateStorageBenchmark(storage1Benchmarks, Category);
            var total1Benchmark = CategoryBenchmarkCalculator.CalculateCategoryBenchmark(scaled1CPU, scaled1GPU, scaled1RAM, scaled1Storage, Category);

            var scaled2GPU = BenchmarkScaler.ScaleBenchmark("GPU", gpu2Benchmarks);
            var scaled2CPU = BenchmarkScaler.ScaleBenchmark("CPU", cpu2Benchmarks);
            var scaled2RAM = BenchmarkScaler.ScaleBenchmark("RAM", ram2Benchmarks);
            var scaled2Storage = StorageCalculator.CalculateStorageBenchmark(storage2Benchmarks, Category);
            var total2Benchmark = CategoryBenchmarkCalculator.CalculateCategoryBenchmark(scaled2CPU, scaled2GPU, scaled2RAM, scaled2Storage, Category);

            // Return the filtered components
            return Ok(new {
                GPU_1 = scaled1GPU,
                CPU_1 = scaled1CPU,
                RAM_1 = scaled1RAM,
                Storage_1 = scaled1Storage,
                totalBenchmark_1 = total1Benchmark,
                GPU_2 = scaled2GPU,
                CPU_2 = scaled2CPU,
                RAM_2 = scaled2RAM,
                Storage_2 = scaled2Storage,
                totalBenchmark_2 = total2Benchmark
            });
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