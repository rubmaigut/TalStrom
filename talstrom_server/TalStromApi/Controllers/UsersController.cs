using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TalStromApi.DTO;
using TalStromApi.Models;

namespace TalStromApi.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class UsersController : ControllerBase
  {
    private readonly TalStromDbContext _context;

    public UsersController(TalStromDbContext context)
    {
      _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<User>>> GetUser()
    {
      try
      {
        return await _context.User.ToListAsync();
      }
      catch (Exception ex)
      {
        // Log the exception for troubleshooting
        Console.WriteLine($"Error in GetUser: {ex}");
        return StatusCode(500, "Internal Server Error");
      }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<User>> GetUser(int id)
    {
      try
      {
        var user = await _context.User.FindAsync(id);

        if (user == null)
        {
          return NotFound("No User found");
        }

        return user;
      }
      catch (Exception ex)
      {
        Console.WriteLine($"Error in GetUser(id): {ex}");
        return StatusCode(500, "Internal Server Error");
      }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutUser(int id, User user)
    {
      if (id != user.Id)
      {
        return BadRequest("Invalid request");
      }

      try
      {
        _context.Entry(user).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return NoContent();
      }
      catch (DbUpdateConcurrencyException ex)
      {
        Console.WriteLine($"Concurrency error in PutUser: {ex}");
        if (!UserExists(id))
        {
          return NotFound("User ID doesn't exist");
        }
        else
        {
          return StatusCode(500, "Internal Server Error");
        }
      }
      catch (Exception ex)
      {
        Console.WriteLine($"Error in PutUser: {ex}");
        return StatusCode(500, "Internal Server Error");
      }
    }

    [HttpPost]
    public async Task<ActionResult<User>> PostUser(UserPostReq userReq)
    {
      try
      {
        var user = new User
        {
          Name = userReq.Name,
          Email = userReq.Email,
          Picture = userReq.Picture,
          Sub = userReq.Sub
        };
        
        _context.User.Add(user);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetUser", new { id = user.Id }, user);
      }
      catch (Exception ex)
      {
        Console.WriteLine($"Error in PostUser: {ex}");
        return StatusCode(500, "Internal Server Error");
      }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(int id)
    {
      try
      {
        var user = await _context.User.FindAsync(id);
        if (user == null)
        {
          return NotFound();
        }

        _context.User.Remove(user);
        await _context.SaveChangesAsync();

        return NoContent();
      }
      catch (Exception ex)
      {
        Console.WriteLine($"Error in DeleteUser: {ex}");
        return StatusCode(500, "Internal Server Error");
      }
    }

    private bool UserExists(int id)
    {
      return _context.User.Any(e => e.Id == id);
    }
  }
}