using Microsoft.AspNetCore.Mvc;
using TalStromApi.DTO;
using TalStromApi.Models;
using TalStromApi.Services;

[Route("api/[controller]")]
[ApiController]
public class PdfController : ControllerBase
{
    private readonly BlobStorageService _blobStorageService;
    private readonly TalStromDbContext _context;

    public PdfController(BlobStorageService blobStorageService, TalStromDbContext context)
    {
        _blobStorageService = blobStorageService;
        _context = context;
    }

    [HttpPost("submitApplication")]
    public async Task<ActionResult<ApplicationForm>> SubmitApplicationForm([FromForm] ApplicationFormDto formDto)
    {
        if (formDto.PdfFile == null || formDto.PdfFile.Length == 0)
        {
            return BadRequest("Please upload a PDF file.");
        }

        var containerName = "pdf";
        
        try
        {
            var pdfUri = await _blobStorageService.UploadPdfAsync(containerName, formDto.PdfFile, formDto.UserSub);

            var applicationForm = new ApplicationForm
            {
                PostId = formDto.PostId,
                Email = formDto.Email,
                Username = formDto.Username,
                PdfFilePath = pdfUri 
            };

            _context.ApplicationForms.Add(applicationForm);
            await _context.SaveChangesAsync();
            
            return CreatedAtAction(nameof(SubmitApplicationForm), new { id = applicationForm.Id }, applicationForm);
        }
        catch (System.Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
}
