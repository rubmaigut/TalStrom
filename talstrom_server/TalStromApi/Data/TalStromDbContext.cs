using Microsoft.EntityFrameworkCore;
using TalStromApi.Models;

namespace TalStromApi.Data;
public class TalStromDbContext : DbContext
{
  public TalStromDbContext(DbContextOptions<TalStromDbContext> options)
    : base(options)
  {
  }
  public DbSet<User> User { get; init; } = default!;
  public DbSet<Posts> Posts { get; init; } = default!;
  public DbSet<Video> Videos { get; init; } = default!;
  public DbSet<Image> Images { get; init; } = default!;
  public DbSet<ApplicationForm> ApplicationForms { get; init; } = default!;
}
