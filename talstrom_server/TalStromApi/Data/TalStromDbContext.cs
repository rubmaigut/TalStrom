using Microsoft.EntityFrameworkCore;
using TalStromApi.Models;

namespace TalStromApi.Data;
public class TalStromDbContext(DbContextOptions<TalStromDbContext> options) : DbContext(options)
{
  public DbSet<User> User { get; set; } = default!;
  public DbSet<Posts> Posts { get; set; } = default!;
  public DbSet<Video> Videos { get; set; } = default!;
  public DbSet<Image> Images { get; set; } = default!;
  public DbSet<ApplicationForm> ApplicationForms { get; set; } = default!;
}
