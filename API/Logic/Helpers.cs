namespace API.Logic
{
    public class BenchmarkScaler
    {
        // Define the max and min values for each component
        private static readonly Dictionary<string, (double max, double min)> ComponentRanges = new Dictionary<string, (double max, double min)>
        {
            { "CPU", (133, 14.7) },
            { "GPU", (370, 0) },
            { "RAM", (201, 27.7) },
            { "HDD", (113, 9.96) },
            { "SSD", (761, 0) }
        };

        // Function to scale the benchmark value
        public static double ScaleBenchmark(string componentType, double benchmarkValue)
        {
            if (!ComponentRanges.ContainsKey(componentType))
            {
                throw new ArgumentException($"Unknown component type: {componentType}");
            }

            var (max, min) = ComponentRanges[componentType];

            // Ensure the benchmark value is within the expected range
            if (benchmarkValue < min || benchmarkValue > max)
            {
                throw new ArgumentOutOfRangeException(nameof(benchmarkValue), $"Benchmark value is out of the allowed range. {componentType} {benchmarkValue} {min} {max}");
            }

            // Calculate the scaled value
            double scaledValue = (benchmarkValue - min) / (max - min) * 100;

            return scaledValue;
        }
    }

    public class CategoryBenchmarkCalculator
    {
        public static double CalculateCategoryBenchmark(double gpuBenchmark, double cpuBenchmark, double ramBenchmark, double storageBenchmark, string category)     
        {
            var weightings = new Dictionary<string, (double gpu, double cpu, double ram, double storage)>
            {
                { "Gaming", (0.50, 0.30, 0.15, 0.05) },
                { "Content Creation", (0.10, 0.40, 0.30, 0.20) },
                { "General Productivity", (0.10, 0.35, 0.30, 0.25) },
                { "Workstation/3D Modeling", (0.35, 0.35, 0.20, 0.10) },
                { "Data Science/AI", (0.25, 0.35, 0.30, 0.10) },
                { "Programming/Development", (0.10, 0.40, 0.30, 0.20) },
                { "Streaming", (0.30, 0.40, 0.20, 0.10) }
            };

            // Check if the category exists in the dictionary
            if (!weightings.TryGetValue(category, out var weights))
            {
                throw new ArgumentException("Invalid category");
            }

            // Calculate the weighted benchmark score
            double weightedBenchmark = 
                (gpuBenchmark * weights.gpu) +
                (cpuBenchmark * weights.cpu) +
                (ramBenchmark * weights.ram) +
                (storageBenchmark * weights.storage);

            return weightedBenchmark;
        }
    }
}