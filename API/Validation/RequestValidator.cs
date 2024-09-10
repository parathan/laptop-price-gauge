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

        public ValidationResult ValidateTwoBenchmark(double gpu1, double cpu1, double ram1, double storage1, double gpu2, double cpu2, double ram2, double storage2, string storageType)
        {
            // Validate each component's benchmark and return any specific errors
            var cpu1Validation = ValidateComponentBenchmark("CPU", cpu1);
            if (!cpu1Validation.IsValid) return cpu1Validation;

            var gpu1Validation = ValidateComponentBenchmark("GPU", gpu1);
            if (!gpu1Validation.IsValid) return gpu1Validation;

            var ram1Validation = ValidateComponentBenchmark("RAM", ram1);
            if (!ram1Validation.IsValid) return ram1Validation;

            var storage1Validation = ValidateComponentBenchmark(storageType, storage1);
            if (!storage1Validation.IsValid) return storage1Validation;

            var cpu2Validation = ValidateComponentBenchmark("CPU", cpu2);
            if (!cpu2Validation.IsValid) return cpu2Validation;

            var gpu2Validation = ValidateComponentBenchmark("GPU", gpu2);
            if (!gpu2Validation.IsValid) return gpu2Validation;

            var ram2Validation = ValidateComponentBenchmark("RAM", ram2);
            if (!ram2Validation.IsValid) return ram2Validation;

            var storage2Validation = ValidateComponentBenchmark(storageType, storage2);
            if (!storage2Validation.IsValid) return storage2Validation;

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