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
    }
}