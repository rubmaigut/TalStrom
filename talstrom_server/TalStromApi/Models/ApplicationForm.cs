using System.ComponentModel.DataAnnotations;

namespace TalStromApi.Models;

public class ApplicationForm
{
    public int Id { get; set; }
    [Required]
    public int PostId { get; set; }
    [Required]
    public string Email { get; set; }
    [Required]
    public string Username { get; set; }
    [Required]
    public string PdfFilePath { get; set; }
    public Posts Post { get; set; }
}