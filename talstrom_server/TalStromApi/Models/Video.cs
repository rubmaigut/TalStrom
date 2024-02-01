using System;
using System.IO;

namespace TalStromApi.Models;

public class Video
{
  public string Title { get; }
  public int Duration { get; }
  public Tuple<int, int> Resolution { get; }
  public float FrameRate { get; }
  public string FileFormat { get; }
  public byte[] ByteData { get; }

  public Video(string title, int duration, Tuple<int, int> resolution, float frameRate, string fileFormat,
    byte[] byteData)

  {
    Title = title;
    Duration = duration;
    FrameRate = frameRate;
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