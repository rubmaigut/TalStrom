using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TalStromApi.Models;
using TalStromApi.DTO;
using TalStromApi.Services;

namespace TalStromApi.Controllers;

[ApiController]
[Route("api/Image")]
public class ImagesController(TalStromDbContext context, BlobStorageService client) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<Image>>> GetAllVideos()
    {
        try
        {
            var videos = await context.Images.ToListAsync();
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
            var image = context.Images.FirstOrDefault(v => v.Id == int.Parse(id));
            if (image != null)
            {
                return Ok(new VideoApiResponseDTO(image.Id, image.Title, image.FileFormat, image.Uri));
            }

            throw new ArgumentException();
        }
        catch (Exception e)
        {
            return NotFound(e);
        }
    }

    [HttpGet("user/{sub}")]
    public async Task<ActionResult<List<Image>>> GetVideosByUser(string sub)
    {
        try
        {
            var user = await context.User.Include(ctx => ctx.Images).FirstOrDefaultAsync(x => x.Sub == sub);
            return Ok(user.Images);
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
        using (var stream = System.IO.File.Create($"{fileName}.jpg"))
        {
            await file.CopyToAsync(stream);
        }

        var videoData = await client.UploadFileAsync("images", $"{fileName}.jpg", sub);

        // Assign image to user and add to database
        var userId = context.User.FirstOrDefault(u => u.Sub == sub)!.Id;
        var image = new Image(videoData.Title, videoData.FileFormat, videoData.Uri, userId);
        context.Images.Add(image);
        await context.SaveChangesAsync();

        System.IO.File.Delete($"{fileName}.jpg");
        return CreatedAtAction("GetAllVideos", new { id = image.Id }, image);
    }

    [HttpDelete("delete")]
    public async Task<IActionResult> Delete(string imageName)
    {
        if (imageName == null)
        {
            return BadRequest("Must provide a filename");
        }

        try
        {
            var videoToDelete = context.Images.FirstOrDefault(i => i.Title == imageName);


            if (videoToDelete != null)
            {
                await client.DeleteFileAsync("images", $"{imageName}.jpg");
                await client.DeleteFileAsync("thumbnails", $"{imageName}.jpg");
                context.Images.Remove(videoToDelete);
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