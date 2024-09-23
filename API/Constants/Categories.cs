namespace API.Constants
{
    public static class Categories
    {
        public static readonly List<string> AllCategories = new List<string>
        {
            "Gaming",
            "Content Creation",
            "General Productivity",
            "Workstation/3D Modeling",
            "Data Science/AI",
            "Programming/Development",
            "Streaming"
        };

        public static readonly Dictionary<string, (double gpu, double cpu, double ram, double storage)> Weightings = new Dictionary<string, (double gpu, double cpu, double ram, double storage)>
        {
            { "Gaming", (0.50, 0.30, 0.15, 0.05) },
            { "Content Creation", (0.10, 0.40, 0.30, 0.20) },
            { "General Productivity", (0.10, 0.35, 0.30, 0.25) },
            { "Workstation/3D Modeling", (0.35, 0.35, 0.20, 0.10) },
            { "Data Science/AI", (0.25, 0.35, 0.30, 0.10) },
            { "Programming/Development", (0.10, 0.40, 0.30, 0.20) },
            { "Streaming", (0.30, 0.40, 0.20, 0.10) }
        };

        /*
        Gaming: Performance (benchmark) is generally more important than size because games benefit from fast read/write speeds.
        Content Creation: Both performance and size are important, but slightly favoring size makes sense due to large media files.
        Data Science/AI: Large datasets require more storage, so size is more important, but performance still matters.
        General Productivity: Balanced weighting between benchmark and size.
        Programming/Development: Size is less important, while performance may be more crucial for fast compiling, loading, and testing.
        Workstation/3D Modeling: Performance is key, but large project files also require sufficient storage.
        Streaming: Size is likely more important for storing large amounts of media data, but performance is also needed for smooth streaming.
        */
        public static readonly Dictionary<string, (double benchmark, double size)> StorageWeightings = new Dictionary<string, (double benchmark, double size)>
        {
            { "Gaming", (0.70, 0.30) },
            { "Content Creation", (0.45, 0.55) },
            { "General Productivity", (0.50, 0.50) },
            { "Workstation/3D Modeling", (0.60, 0.40) },
            { "Data Science/AI", (0.40, 0.60) },
            { "Programming/Development", (0.65, 0.35) },
            { "Streaming", (0.40, 0.60) }
        };
    }
}