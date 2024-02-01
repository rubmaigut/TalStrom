using System;
using System.IO;

namespace TalStromApi.Models;

public class Video
{
  public int Id { get; set; }
  public string Title { get; set; }
  public long? Duration { get; set; }
  public string FileFormat { get; set; }
  public byte[] ByteData { get; set; }
  public int UserId { get; set; }

  public Video(string title, long? duration, string fileFormat,
    byte[] byteData, int userId)

  {
    Title = title;
    Duration = duration;
    FileFormat = fileFormat;
    ByteData = byteData;
    UserId = userId;
  }

  public void Play()
  {
    Console.WriteLine($"Playing: {Title}");
  }

  public void Save(string filePath)
  {
    File.WriteAllBytes(filePath, ByteData);
    Console.WriteLine($"Video save to: {filePath}");
  }

  public void ProcessFrames()
  {
    Console.WriteLine($"ProcessFrames for: {Title}");
  }
}