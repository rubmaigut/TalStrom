using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TalStromApi.Models;

public class TalStromDbContext : DbContext
{
  public TalStromDbContext(DbContextOptions<TalStromDbContext> options)
    : base(options)
  {
  }

  public DbSet<Admin> Admin { get; set; } = default!;

  public DbSet<User> User { get; set; } = default!;

  public DbSet<Posts> Posts { get; set; } = default!;

  public DbSet<SalesRep> SalesRep { get; set; } = default!;
}