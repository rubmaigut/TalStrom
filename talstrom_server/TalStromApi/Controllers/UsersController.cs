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
          .Include(ctx => ctx.Videos)
          .ToListAsync();
      }
      catch (Exception ex)
      {
        Console.WriteLine($"Error in GetUser: {ex}");
        return StatusCode(500, "Internal Server Error");
      }
    }

    [HttpGet("{sub}")]
    public async Task<ActionResult<User>> GetUserBySub(string sub)
    {
      try
      {
        var user = await _context.User.
          Include(ctx => ctx.Posts)
          .Include(ctx => ctx.Videos)
          .Include(ctx => ctx.Images)
          .FirstOrDefaultAsync(x=> x.Sub == sub);
        
       return user is null ? NotFound() :  Ok(user);
      }
      catch (Exception ex)
      {
        Console.WriteLine($"Error in GetUser(id): {ex}");
        return StatusCode(500, "Internal Server Error");
      }
    }
    
    [HttpGet("technologies/filter/{sub}")]
    public async Task<ActionResult<User>> GetUserByFilter(string sub)
    {
      try
      {
        Console.WriteLine(sub);
        
        var user = await _context.User.Include(ctx => ctx.Posts)
          .Include(ctx => ctx.Videos)
          .Include(ctx => ctx.Images)
          .ToListAsync();
        
        return user is null ? NotFound() :  Ok(user);
      }
      catch (Exception ex)
      {
        Console.WriteLine($"Error in GetUser(id): {ex}");
        return StatusCode(500, "Internal Server Error");
      }
    }
    
    [HttpGet("role/{role}")]
    public async Task<IActionResult> GetUsersByRole(string role)
    {
      var users = await _context.User
        .Where(u => u.Role == role)
        .ToListAsync();

      return users is not null ? Ok(users) : NotFound("$User Not Found with {role}");
    }

    [HttpPatch("{sub}/{role}")]
    public async Task<IActionResult> UpdateUserRole(string sub, string role)
    {
      var user = await _context.User.FirstOrDefaultAsync(x=> x.Sub == sub);

      if (user is null) return NotFound();

      user.Role = role ;
      await _context.SaveChangesAsync();
      return Ok(user);
    }
    
    [HttpPatch("{sub}/activeStatus/{isActive}")]
    public async Task<IActionResult> UpdateUserActiveStatus(string sub, bool isActive)
    {
      var user = await _context.User.FirstOrDefaultAsync(x=> x.Sub == sub);

      if (user is null) return NotFound();

      user.Active = isActive ;
      await _context.SaveChangesAsync();
      return Ok(user);
    }
    
    [HttpPatch("editProfile/{sub}")]
    public async Task<ActionResult<User>> EditUserProfile(string sub, EditUserDTO editUserDto)
    {
      var user = await _context.User.FirstOrDefaultAsync(x=> x.Sub == sub);

      if (user is null) return NotFound();
      
      user.UserName = editUserDto.UserName;
      user.Technologies = editUserDto.Technologies; 
      user.Bio = editUserDto.Bio;
      user.Position = editUserDto.Position;
      user.LastModified = DateTime.Now;

      _context.User.Update(user);
      await _context.SaveChangesAsync();
      return Ok(user);;
    }
    
    [HttpPost]
    public async Task<ActionResult<User>> PostUser(UserPostReq userReq)
    {
      try
      {
        var existingUser = await _context.User.FirstOrDefaultAsync(u => u.Sub == userReq.Sub);
        if (existingUser != null)
        {
          return StatusCode(409, existingUser);
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

        return CreatedAtAction("GetUserBySub", new { sub = user.Sub }, user);
      }
      catch (Exception ex)
      {
        Console.WriteLine($"Error in PostUser: {ex}");
        throw ex;
      }
    }

    [HttpDelete("{sub}")]
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