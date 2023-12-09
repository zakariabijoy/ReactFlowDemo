using Microsoft.EntityFrameworkCore;
using ReactFlowBE.Models;

namespace ReactFlowBE.Data;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions<DataContext> options) : base(options)
    {
        
    }

    public DbSet<ReactFlow> ReactFlows { get; set; }
}
