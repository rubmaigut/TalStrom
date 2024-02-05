namespace TalStromApi.Models;

public class Video(string title, string fileFormat,
  string uri, int userId)
{
  public int Id { get; set; }
  public string Title { get; set; } = title;
  public string FileFormat { get; set; } = fileFormat;
  public string Uri { get; set; } = uri;
  public int UserId { get; set; } = userId;
}