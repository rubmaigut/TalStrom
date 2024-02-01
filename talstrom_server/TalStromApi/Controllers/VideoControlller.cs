using AzureFullstackPractice.Data;
using Microsoft.AspNetCore.Mvc;
using TalStromApi.Models;

namespace TalStromApi.Controllers;

[ApiController]
[Route("[controller]")]
public class VideoController : ControllerBase
{
  private readonly TalStromDbContext _context;
  private readonly BlobStorageService _client;

  public VideoController(TalStromDbContext context, BlobStorageService client)
  {
    _context = context;
    _client = client;
  }

  [HttpGet]
  public async Task<ActionResult<Video>> GetAllVideos()
  {
    try
    {
      var videos = await _client.GetAllVideos("movies");
      return Ok(videos);
    }
    catch (Exception e)
    {
      return NotFound(e);
    }
  }

  [HttpGet("{id}")]
  public async Task<ActionResult<Video>> GetVideosById(string id)
  {
    Console.WriteLine($"HERE IS THE ID±!!!!! {id}");
    try
    {
      var videos = await _client.GetVideosById("movies", id);
      return Ok(videos);
    }
    catch (Exception e)
    {
      return NotFound(e);
    }
  }

  [HttpPost("upload")]
  public async Task<IActionResult> Upload([FromForm] IFormFile file, string userSub)
  {
    if (file == null || file.Length == 0)
    {
      return BadRequest("No file uploaded.");
    }

    var fileName = Guid.NewGuid();
    using (var stream = System.IO.File.Create($"{fileName}.mp4"))
    {
      await file.CopyToAsync(stream);
    }

    //Be specific about file format for now.
    await _client.UploadFileAsync("movies", $"{fileName}.mp4", userSub);
    System.IO.File.Delete($"{fileName}.mp4");
    return Ok("File uploaded successfully.");
  }

  [HttpDelete("delete")]
  public async Task<IActionResult> Delete(string videoName)
  {
    if (videoName == null)
    {
      return BadRequest("File not found.");
    }

    await _client.DeleteFileAsync("movies", videoName);
    return Ok("File deleted.");
  }
}