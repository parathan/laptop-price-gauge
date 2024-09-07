using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    [Table("components")]
    public class Component
    {
        [Column("id")]
        public int Id { get; set; }
        [Column("Type")]
        public required string Type { get; set; }
        [Column("Part Number")]
        public string? PartNumber { get; set; }
        [Column("Brand")]
        public string? Brand { get; set; }
        [Column("Model")]
        public string? Model { get; set; }
        [Column("Rank")]
        public int? Rank { get; set; }
        [Column("Benchmark")]
        public float? Benchmark { get; set; }
        [Column("Samples")]
        public int? Samples { get; set; }
        [Column("URL")]
        public string? URL { get; set; }

    }

    public class ComponentGroup
    {
        public string? Type { get; set; }
        public List<Component>? Components { get; set; }
    }

}