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
    public async Task<IActionResult> Upload([FromForm] IFormFile file, string fileName)
    {
        if (file == null || file.Length == 0)
        {
            return BadRequest("No file uploaded.");
        }

        using (var stream = System.IO.File.Create(fileName))
        {
            await file.CopyToAsync(stream);
        }

        await _client.UploadFileAsync("personfullstackblob", fileName);
        return Ok("File uploaded successfully.");
    }
}