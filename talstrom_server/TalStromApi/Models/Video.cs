using System;
using System.IO;

namespace TalStromApi.Models;

public class Video
{
  public string Title { get; set; }
  public long? Duration { get; set; }
  public Tuple<int, int> Resolution { get; set; }
  public string FileFormat { get; set; }
  public byte[] ByteData { get; set; }

  public Video(string title, long? duration, string fileFormat,
    byte[] byteData)

  {
    Title = title;
    Duration = duration;
    FileFormat = fileFormat;
    ByteData = byteData;
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