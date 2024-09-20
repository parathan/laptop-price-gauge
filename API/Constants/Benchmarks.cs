namespace API.Constants
{
    public static class ComponentConstants
    {
        public static readonly Dictionary<string, (double max, double min)> ComponentRanges = new Dictionary<string, (double max, double min)>
        {
            { "CPU", (133, 14.7) },
            { "GPU", (370, 0) },
            { "RAM", (201, 27.7) },
            { "HDD", (113, 9.96) },
            { "SSD", (761, 0) },
            { "Storage", (761, 0)},
            { "StorageSize", (12000, 31)}
        };
    }
}
