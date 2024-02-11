using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace TalStromApi.Models;

public class User
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string UserName { get; set; } = "";
    public string Email { get; set; }
    public string Picture { get; set; }
    public string Sub { get; set; }
    public string Role { get; set; }
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

    // public User()
    // {
    //     UserName = Regex.Replace(Name.ToLower(), @"s", "");
    // }
}