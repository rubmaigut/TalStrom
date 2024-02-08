

using System.ComponentModel.DataAnnotations;

namespace TalStromApi.Models;

public class Image(string title, string fileFormat,
    string uri, int userId)
{
    public int Id { get; set; }
    [Required]
    public string Title { get; set; } = title;
    [Required]
    public string FileFormat { get; set; } = fileFormat;
    [Required]
    public string Uri { get; set; } = uri;
    public int UserId { get; set; } = userId;
}