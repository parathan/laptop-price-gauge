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
}