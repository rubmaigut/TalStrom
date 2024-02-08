namespace TalStromApi.DTO;

public class ApplicationFormDto
{
    public IFormFile PdfFile { get; set; }
    public string UserSub { get; set; }
    public int PostId { get; set; }
    public string Email { get; set; } 
    public string Username { get; set; }
    
}
