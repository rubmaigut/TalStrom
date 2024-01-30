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
  public class SalesRepController : ControllerBase
  {
    private readonly TalStromDbContext _context;

    public SalesRepController(TalStromDbContext context)
    {
      _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<SalesRep>>> GetSalesRep()
    {
      try
      {
        return await _context.SalesRep.ToListAsync();
      }
      catch (Exception ex)
      {
        // Log the exception for troubleshooting
        Console.WriteLine($"Error in GetSalesRep: {ex}");
        return StatusCode(500, "Internal Server Error");
      }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<SalesRep>> GetSalesRep(int id)
    {
      try
      {
        var salesRep = await _context.SalesRep.FindAsync(id);

        if (salesRep == null)
        {
          return NotFound("No SalesRep found");
        }

        return salesRep;
      }
      catch (Exception ex)
      {
        Console.WriteLine($"Error in GetSalesRep(id): {ex}");
        return StatusCode(500, "Internal Server Error");
      }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutSalesRep(int id, SalesRep salesRep)
    {
      if (id != salesRep.Id)
      {
        return BadRequest("Invalid request");
      }

      try
      {
        _context.Entry(salesRep).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return NoContent();
      }
      catch (DbUpdateConcurrencyException ex)
      {
        Console.WriteLine($"Concurrency error in PutSalesRep: {ex}");
        if (!SalesRepExists(id))
        {
          return NotFound("SalesRep ID doesn't exist");
        }
        else
        {
          return StatusCode(500, "Internal Server Error");
        }
      }
      catch (Exception ex)
      {
        Console.WriteLine($"Error in PutSalesRep: {ex}");
        return StatusCode(500, "Internal Server Error");
      }
    }

    [HttpPost]
    public async Task<ActionResult<SalesRep>> PostSalesRep(SalesRep salesRep)
    {
      try
      {
        _context.SalesRep.Add(salesRep);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetSalesRep", new { id = salesRep.Id }, salesRep);
      }
      catch (Exception ex)
      {
        Console.WriteLine($"Error in PostSalesRep: {ex}");
        return StatusCode(500, "Internal Server Error");
      }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteSalesRep(int id)
    {
      try
      {
        var salesRep = await _context.SalesRep.FindAsync(id);
        if (salesRep == null)
        {
          return NotFound();
        }

        _context.SalesRep.Remove(salesRep);
        await _context.SaveChangesAsync();

        return NoContent();
      }
      catch (Exception ex)
      {
        Console.WriteLine($"Error in DeleteSalesRep: {ex}");
        return StatusCode(500, "Internal Server Error");
      }
    }

    private bool SalesRepExists(int id)
    {
      return _context.SalesRep.Any(e => e.Id == id);
    }
  }
}