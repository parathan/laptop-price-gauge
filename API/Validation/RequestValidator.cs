using API.Models;
using API.Constants;

namespace API.Validators
{
    public class ValidationResult
    {
        public bool IsValid { get; set; }
        public string? ErrMessage { get; set; }
    }
    public class RequestValidator
    {
        public ValidationResult ValidateBenchmarkRequest(BenchmarkRequest request)
        {
            // Validate each component's benchmark and return any specific errors
            var cpuValidation = ValidateComponentBenchmark("CPU", request.CPU);
            if (!cpuValidation.IsValid) return cpuValidation;

            var gpuValidation = ValidateComponentBenchmark("GPU", request.GPU);
            if (!gpuValidation.IsValid) return gpuValidation;

            var ramValidation = ValidateComponentBenchmark("RAM", request.RAM);
            if (!ramValidation.IsValid) return ramValidation;

            var storageValidation = ValidateComponentBenchmark(request.StorageType, request.Storage);
            if (!storageValidation.IsValid) return storageValidation;

            // If all validations pass
            return new ValidationResult { IsValid = true };
        }

        public ValidationResult ValidateBenchmark(double gpu, double cpu, double ram, string storageType, double storage)
        {
            // Validate each component's benchmark and return any specific errors
            var cpuValidation = ValidateComponentBenchmark("CPU", cpu);
            if (!cpuValidation.IsValid) return cpuValidation;

            var gpuValidation = ValidateComponentBenchmark("GPU", gpu);
            if (!gpuValidation.IsValid) return gpuValidation;

            var ramValidation = ValidateComponentBenchmark("RAM", ram);
            if (!ramValidation.IsValid) return ramValidation;

            var storageValidation = ValidateComponentBenchmark(storageType, storage);
            if (!storageValidation.IsValid) return storageValidation;

            // If all validations pass
            return new ValidationResult { IsValid = true };
        }

        private ValidationResult ValidateComponentBenchmark(string componentType, double benchmarkValue)
        {
            // Check if the componentType is in the dictionary and validate the value
            if (ComponentConstants.ComponentRanges.TryGetValue(componentType, out var range))
            {
                if (benchmarkValue < range.min || benchmarkValue > range.max)
                {
                    return new ValidationResult
                    {
                        IsValid = false,
                        ErrMessage = $"{componentType} benchmark value {benchmarkValue} is out of range. Allowed range: {range.min} - {range.max}."
                    };
                }

                return new ValidationResult { IsValid = true };
            }

            // If component type is not found in the dictionary
            return new ValidationResult
            {
                IsValid = false,
                ErrMessage = $"{componentType} is not a valid component type."
            };
        }
    }
}