using AzureFullstackPractice.Data;
using Microsoft.AspNetCore.Mvc;

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
}