namespace TalStromApi.DTO;

public record VideoApiResponseDTO()
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string FileFormat { get; set; }
    public string Uri { get; set; }

    public VideoApiResponseDTO(int id, string title, string fileFormat, string uri) : this()
    {
        Id = id;
        Title = title;
        FileFormat = fileFormat;
        Uri = uri;
    }
};