using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TalStromApi.Models;
using TalStromApi.DTO;
using TalStromApi.Services;

namespace TalStromApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class VideoController(TalStromDbContext context, BlobStorageService client) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<Video>>> GetAllVideos()
    {
        try
        {
            var videos = await context.Videos.ToListAsync();
            return Ok(videos);
        }
        catch (Exception e)
        {
            return NotFound(e);
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<VideoApiResponseDTO>> GetVideoById(string id)
    {
        try
        {
            var video = context.Videos.FirstOrDefault(v => v.Id == int.Parse(id));
            if (video != null)
            {
                return Ok(new VideoApiResponseDTO(video.Id, video.Title, video.FileFormat, video.Uri));
            }

            throw new ArgumentException();
        }
        catch (Exception e)
        {
            return NotFound(e);
        }
    }

    [HttpGet("user/{sub}")]
    public async Task<ActionResult<List<Video>>> GetVideosByUser(string sub)
    {
        try
        {
            var user = await context.User.Include(ctx => ctx.Videos).FirstOrDefaultAsync(x => x.Sub == sub);
            return Ok(user.Videos);
        }
        catch (Exception e)
        {
            return NotFound(e);
        }
    }

    [HttpPost("upload")]
    public async Task<IActionResult> Upload([FromForm] string sub, [FromForm] IFormFile file)
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

        var videoData = await client.UploadFileAsync("movies", $"{fileName}.mp4", sub);

        // Assign video to user and add to database
        var userId = context.User.FirstOrDefault(u => u.Sub == sub)!.Id;
        var video = new Video(videoData.Title, videoData.FileFormat, videoData.Uri, userId);
        context.Videos.Add(video);
        await context.SaveChangesAsync();

        System.IO.File.Delete($"{fileName}.mp4");
        return CreatedAtAction("GetAllVideos", new { id = video.Id }, video);
    }

    [HttpDelete("delete")]
    public async Task<IActionResult> Delete(string videoName)
    {
        if (videoName == null)
        {
            return BadRequest("Must provide a filename");
        }

        try
        {
            var videoToDelete = context.Videos.FirstOrDefault(v => v.Title == videoName);


            if (videoToDelete != null)
            {
                await client.DeleteFileAsync("movies", $"{videoName}.mp4");
                context.Videos.Remove(videoToDelete);
                await context.SaveChangesAsync();
                return Ok("File deleted.");
            }

            return NotFound();
        }
        catch (Exception e)
        {
            return BadRequest(e);
        }
    }
}