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
  public class PostsController : ControllerBase
  {
    private readonly TalStromDbContext _context;

    public PostsController(TalStromDbContext context)
    {
      _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Posts>>> GetPosts()
    {
      try
      {
        return await _context.Posts.ToListAsync();
      }
      catch (Exception ex)
      {
        // Log the exception for troubleshooting
        Console.WriteLine($"Error in GetPosts: {ex}");
        return StatusCode(500, "Internal Server Error");
      }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Posts>> GetPosts(int id)
    {
      try
      {
        var posts = await _context.Posts.FindAsync(id);

        if (posts == null)
        {
          return NotFound();
        }

        return posts;
      }
      catch (Exception ex)
      {
        Console.WriteLine($"Error in GetPosts(id): {ex}");
        return StatusCode(500, "Internal Server Error");
      }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutPosts(int id, Posts posts)
    {
      if (id != posts.Id)
      {
        return BadRequest("Invalid request");
      }

      try
      {
        _context.Entry(posts).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return NoContent();
      }
      catch (DbUpdateConcurrencyException ex)
      {
        // Handle concurrency exception
        Console.WriteLine($"Concurrency error in PutPosts: {ex}");
        return Conflict("Concurrency Error");
      }
      catch (Exception ex)
      {
        Console.WriteLine($"Error in PutPosts: {ex}");
        return StatusCode(500, "Internal Server Error");
      }
    }

    [HttpPost]
    public async Task<ActionResult<Posts>> PostPosts(Posts posts)
    {
      try
      {
        _context.Posts.Add(posts);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetPosts", new { id = posts.Id }, posts);
      }
      catch (Exception ex)
      {
        Console.WriteLine($"Error in PostPosts: {ex}");
        return StatusCode(500, "Internal Server Error");
      }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePosts(int id)
    {
      try
      {
        var posts = await _context.Posts.FindAsync(id);
        if (posts == null)
        {
          return NotFound();
        }

        _context.Posts.Remove(posts);
        await _context.SaveChangesAsync();

        return NoContent();
      }
      catch (Exception ex)
      {
        Console.WriteLine($"Error in DeletePosts: {ex}");
        return StatusCode(500, "Internal Server Error");
      }
    }

    private bool PostsExists(int id)
    {
      return _context.Posts.Any(e => e.Id == id);
    }
  }
}