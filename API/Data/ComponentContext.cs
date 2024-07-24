using Models;
using Microsoft.EntityFrameworkCore;

namespace Data
{
    public class ComponentContext : DbContext
    {
        public ComponentContext(DbContextOptions<ComponentContext> options) : base(options)
        {
        }

        public DbSet<Component> Components { get; set; }
    }
}