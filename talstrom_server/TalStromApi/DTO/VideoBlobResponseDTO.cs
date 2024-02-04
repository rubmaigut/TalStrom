namespace TalStromApi.DTO;

public record VideoBlobResponseDTO
{
    public string Title { get; set; }
    public string FileFormat { get; set; }
    public string Uri { get; set; }
    
    public VideoBlobResponseDTO(string title, string fileFormat,
        string uri)

    {
        Title = title;
        FileFormat = fileFormat;
        Uri = uri;
    }
}