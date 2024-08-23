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

}