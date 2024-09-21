using API.Constants;
namespace API.Logic
{
    public class BenchmarkScaler
    {
        // Define the max and min values for each component
        private static readonly Dictionary<string, (double max, double min)> ComponentRanges = ComponentConstants.ComponentRanges;

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
            var weightings = Categories.Weightings;

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

    public class StorageCalculator
    {
        public static double CalculateStorageBenchmark(List<(float, float)> storageList, double benchmarkWeight = 0.5, double sizeWeight = 0.5)
        {
            
            // One option is to just take the highest storage score, which is a combined score of an individual storage's benchmark and size,

            // The weights for benchmark and storage itself will differ based on the category.

            double maxStorage =  0;
            foreach (var storage in storageList)
            {
                double scaledBenchmark = BenchmarkScaler.ScaleBenchmark("Storage", storage.Item1);
                double scaledSize = BenchmarkScaler.ScaleBenchmark("StorageSize", storage.Item2);
                double storageScore = (scaledBenchmark * benchmarkWeight) + (scaledSize * sizeWeight);
                if (storageScore > maxStorage)
                {
                    maxStorage = storageScore;
                }

            }

            return maxStorage;
        }
    }
}