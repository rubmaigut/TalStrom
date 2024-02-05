namespace TalStromApi.Models;

public class ApplicationForm
{
    public int Id { get; set; }
    public int PostId { get; set; }
    public string Email { get; set; }
    public string Username { get; set; }
    public string PdfFilePath { get; set; }
    public Posts Post { get; set; }
}