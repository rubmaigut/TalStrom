using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TalStromApi.Models;

    public class TalStromDbContext : DbContext
    {
        public TalStromDbContext (DbContextOptions<TalStromDbContext> options)
            : base(options)
        {
        }

        public DbSet<TalStromApi.Models.Admin> Login { get; set; } = default!;
    }
