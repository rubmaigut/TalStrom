using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using TalStromApi.Data;
using TalStromApi.DTO;
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
    public async Task<ActionResult<Posts>> PutPosts(int id, PostsRequestDTO postRequest)
    {
      try
      {
        var user = _context.User.FirstOrDefault(u => u.Sub == postRequest.UserSub);
        if (user == null)
        {
          return BadRequest("Invalid user");
        }

        var existingPost = await _context.Posts.FindAsync(id);

        if (existingPost == null)
        {
          return NotFound();
        }

        existingPost.PostType = postRequest.PostType;
        existingPost.Title = postRequest.Title;
        existingPost.Content = postRequest.Content;
        existingPost.UserId = user.Id;

        await _context.SaveChangesAsync();

        return NoContent();
      }
      catch (Exception ex)
      {
        Console.WriteLine($"Error in PutPosts: {ex}");
        return StatusCode(500, "Internal Server Error");
      }
    }

    [HttpPost]
    public async Task<ActionResult<Posts>> PostPosts(PostsRequestDTO postRequest)
    {
      try
      {
        // Log the received payload
        Console.WriteLine($"Received request with payload: {JsonConvert.SerializeObject(postRequest)}");

        var user = _context.User.FirstOrDefault(u => u.Sub == postRequest.UserSub);
        if (user == null)
        {
          Console.WriteLine("Invalid user");
          return BadRequest("Invalid user");
        }

        _context.Posts.Add(new Posts()
        {
          PostType = postRequest.PostType,
          Author = user.Name,
          Title = postRequest.Title,
          Content = postRequest.Content,
          UserId = user.Id,
          RecruiterName = !string.IsNullOrEmpty(postRequest.RecruiterName) ? postRequest.RecruiterName : null,
          RecruiterEmail = !string.IsNullOrEmpty(postRequest.RecruiterEmail) ? postRequest.RecruiterEmail : null,
          
        });

        await _context.SaveChangesAsync();

        // Log successful post creation
        Console.WriteLine("Post created successfully");

        return CreatedAtAction("GetPosts", new { id = postRequest.Id }, postRequest);
      }
      catch (Exception ex)
      {
        // Log the exception for troubleshooting
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