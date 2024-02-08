using Microsoft.Build.Framework;

namespace TalStromApi.Models;

public class User
{
    public int Id { get; set; }
    [Required]
    public string Name { get; set; }
    public string UserName { get; set; } = "";
    [Required]

    public string Email { get; set; }
    [Required]

    public string Picture { get; set; }
    [Required]

    public string Sub { get; set; }
    public string Role { get; set; } = "pending";
    public string Technologies { get; set; } = "";
    public string? PhoneNumber { get; set; }
    public DateTime DateAdded { get; set; } = DateTime.Now;
    public DateTime LastLoggedIn { get; set; }
    public DateTime LastModified { get; set; }
    public string Bio { get; set; } = "";
    public string Position { get; set; } = "";
    public bool Active { get; set; } = true;
    public List<Video>? Videos { get; set; }
    public List<Image>? Images { get; set; }
    public List<string>? Favorites { get; set; }
    public List<string>? Followers { get; set; }
    public List<string>? Following { get; set; }
    public List<Posts>? Posts { get; set; }
}