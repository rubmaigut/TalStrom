using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TalStromApi.Models;

namespace TalStromApi.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class AdminController : ControllerBase
  {
    private readonly TalStromDbContext _context;

    public AdminController(TalStromDbContext context)
    {
      _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Admin>>> GetLogin()
    {
      try
      {
        return await _context.Admin.ToListAsync();
      }
      catch (Exception ex)
      {
        // Log the exception for troubleshooting
        Console.WriteLine($"Error in GetLogin: {ex}");
        return StatusCode(500, "Internal Server Error");
      }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Admin>> GetAdmin(int id)
    {
      try
      {
        var admin = await _context.Admin.FindAsync(id);

        if (admin == null)
        {
          return NotFound("No Admin found");
        }

        return admin;
      }
      catch (Exception ex)
      {
        Console.WriteLine($"Error in GetAdmin(id): {ex}");
        return StatusCode(500, "Internal Server Error");
      }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutAdmin(int id, Admin admin)
    {
      if (id != admin.Id)
      {
        return BadRequest("Invalid request");
      }

      try
      {
        _context.Entry(admin).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return NoContent();
      }
      catch (DbUpdateConcurrencyException ex)
      {
        Console.WriteLine($"Concurrency error in PutAdmin: {ex}");
        if (!AdminExists(id))
        {
          return NotFound("Admin ID doesn't exist");
        }
        else
        {
          return StatusCode(500, "Internal Server Error");
        }
      }
      catch (Exception ex)
      {
        Console.WriteLine($"Error in PutAdmin: {ex}");
        return StatusCode(500, "Internal Server Error");
      }
    }

    [HttpPost]
    public async Task<ActionResult<Admin>> PostAdmin(Admin admin)
    {
      try
      {
        _context.Admin.Add(admin);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetAdmin", new { id = admin.Id }, admin);
      }
      catch (Exception ex)
      {
        Console.WriteLine($"Error in PostAdmin: {ex}");
        return StatusCode(500, "Internal Server Error");
      }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAdmin(int id)
    {
      try
      {
        var admin = await _context.Admin.FindAsync(id);
        if (admin == null)
        {
          return NotFound();
        }

        _context.Admin.Remove(admin);
        await _context.SaveChangesAsync();

        return NoContent();
      }
      catch (Exception ex)
      {
        Console.WriteLine($"Error in DeleteAdmin: {ex}");
        return StatusCode(500, "Internal Server Error");
      }
    }

    private bool AdminExists(int id)
    {
      return _context.Admin.Any(e => e.Id == id);
    }
  }
}