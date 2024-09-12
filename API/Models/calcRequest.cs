using Microsoft.EntityFrameworkCore.Storage;

namespace API.Models
{
    public class ComponentRequest
    {   
        required public string GPUModel { get; set; }
        required public string GPUBrand { get; set; }
        required public string CPUModel { get; set; }
        required public string CPUBrand { get; set; }
        required public string RAMModel { get; set; }
        required public string RAMBrand { get; set; }
        required public string StorageBrand { get; set; }
        required public string StorageModel { get; set; }
        required public string StorageType { get; set; }
        required public string Category { get; set; }
    }

    public class BenchmarkRequest
    {
        required public float GPU { get; set; }
        required public float CPU { get; set; }
        required public float RAM { get; set; }
        required public float Storage { get; set; }
        required public string StorageType { get; set; }
        required public string Category { get; set; }
    }

    public class TwoBenchmarkRequest
    {
        required public float GPU_1 { get; set; }
        required public float CPU_1 { get; set; }
        required public float RAM_1 { get; set; }
        required public List<float> Storage_1 { get; set; }
        required public float GPU_2 { get; set; }
        required public float CPU_2 { get; set; }
        required public float RAM_2 { get; set; }
        required public List<float> Storage_2 { get; set; }
        required public string StorageType { get; set; }
        required public string Category { get; set; }
    }
}