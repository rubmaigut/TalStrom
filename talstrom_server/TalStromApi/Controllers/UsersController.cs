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
        Console.WriteLine($"Error in GetUser: {ex}");
        return StatusCode(500, "Internal Server Error");
      }
    }

    [HttpGet("{sub}")]
    public async Task<ActionResult<User>> GetUser(string sub)
    {
      try
      {
        var user = await _context.User.FindAsync(sub);

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

    [HttpPut("{sub}")]
    public async Task<IActionResult> PutUser(string sub, User user)
    {
      if (sub != user.Sub)
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
        if (!UserExists(sub))
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
        //var sub = await GetUser(userReq.Sub);
        if (UserExists(userReq.Sub))
        {
          return Ok("User already in database");
        }
        
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
    public async Task<IActionResult> DeleteUser(string sub)
    {
      try
      {
        var user = await _context.User.FirstOrDefaultAsync(x=> x.Sub == sub);
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
    private bool UserExists(string sub)
    {
      return _context.User.Any(e => e.Sub == sub);
    }
  }
}