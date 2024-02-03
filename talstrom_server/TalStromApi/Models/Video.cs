using System;
using System.IO;

namespace TalStromApi.Models;

public class Video
{
  public int Id { get; set; }
  public string Title { get; set; }
  public string FileFormat { get; set; }
  public string Uri { get; set; }
  public int UserId { get; set; }

  public Video(string title, string fileFormat,
    string uri, int userId)

  {
    Title = title;
    FileFormat = fileFormat;
    Uri = uri;
    UserId = userId;
  }
}