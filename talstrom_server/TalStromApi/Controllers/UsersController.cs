using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
        return await _context.User
          .Include(ctx => ctx.Posts)
          .Include(ctx => ctx.Followers)
          .Include(ctx => ctx.Videos)
          .ToListAsync();
      }
      catch (Exception ex)
      {
        Console.WriteLine($"Error in GetUser: {ex}");
        return StatusCode(500, "Internal Server Error");
      }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<User>> GetUserBySub(string sub)
    {
      try
      {
        var user = await _context.User.FirstOrDefaultAsync(x=> x.Sub == sub);;
        
       return user is null ? NotFound() :  Ok(user);
      }
      catch (Exception ex)
      {
        Console.WriteLine($"Error in GetUser(id): {ex}");
        return StatusCode(500, "Internal Server Error");
      }
    }
    
    [HttpGet("role")]
    public async Task<IActionResult> GetUsersByRole(string role)
    {
      var users = await _context.User
        .Where(u => u.Role == role)
        .ToListAsync();

      return users is not null ? Ok(users) : NotFound("$User Not Found with {role}");
    }

    [HttpPatch("{sub}/role")]
    public async Task<IActionResult> UpdateUserRole(string sub, [FromBody] string newRole)
    {
      var user = await _context.User.FirstOrDefaultAsync(x=> x.Sub == sub);

      if (user is null) return NotFound();

      user.Role = newRole;
      await _context.SaveChangesAsync();
      return NoContent();
    }

    [HttpPost]
    public async Task<ActionResult<User>> PostUser(UserPostReq userReq)
    {
      try
      {
        if (UserExists(userReq.Sub)) return Ok("User already in database");
        
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
      if (!UserExists(sub))
      {
        return BadRequest();
      }
      
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