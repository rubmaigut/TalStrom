namespace TalStromApi.DTO;

public class VideoBlobResponseDTO
{
    public string Title { get; set; }
    public long? Duration { get; set; }
    public string FileFormat { get; set; }
    public byte[] ByteData { get; set; }
    
    public VideoBlobResponseDTO(string title, long? duration, string fileFormat,
        byte[] byteData)

    {
        Title = title;
        Duration = duration;
        FileFormat = fileFormat;
        ByteData = byteData;
    }
}