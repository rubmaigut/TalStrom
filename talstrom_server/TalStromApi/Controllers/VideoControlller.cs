using AzureFullstackPractice.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TalStromApi.Models;
using System.IO;

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
    public async Task<ActionResult<List<Video>>> GetAllVideos()
    {
        try
        {
            // var videos = await _client.GetAllVideos("movies");
            var videos = await _context.Videos.ToListAsync();
            return Ok(videos);
        }
        catch (Exception e)
        {
            return NotFound(e);
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<List<Video>>> GetVideosByUser(string id)
    {
        try
        {
            //var videos = await _client.GetVideosById("movies", id);
            var user = await _context.User.Include(ctx => ctx.Videos).FirstOrDefaultAsync(x => x.Sub == id);
            return Ok(user.Videos);
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
        var videoData = await _client.UploadFileAsync("movies", $"{fileName}.mp4", userSub);
        var user = _context.User.FirstOrDefault(u => u.Sub == userSub);
        var video = new Video(videoData.Title, videoData.FileFormat, videoData.Uri, user.Id);
        _context.Videos.Add(video);
        await _context.SaveChangesAsync();

        System.IO.File.Delete($"{fileName}.mp4");
        return CreatedAtAction("GetAllVideos", new { id = video.Id }, video);
    }

    [HttpDelete("delete")]
    public async Task<IActionResult> Delete(string videoName)
    {
        if (videoName == null)
        {
            return BadRequest("File not found.");
        }

        var videoToDelete = _context.Videos.FirstOrDefault(v => v.Title == videoName);
        if (videoToDelete != null)
        {
            await _client.DeleteFileAsync("movies", videoName);
            _context.Videos.Remove(videoToDelete);
            return Ok("File deleted.");
        }

        return NotFound();
    }
}