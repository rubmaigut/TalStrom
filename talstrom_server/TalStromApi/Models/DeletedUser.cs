namespace TalStromApi.Models;

public class DeletedUser
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string Picture { get; set; }
    public string Sub { get; set; }
    public string Role { get; set; }
    public string? PhoneNumber { get; set; }
    public string Technologies { get; set; }
    public DateTime DateAdded { get; set; }
    public DateTime LastLoggedIn { get; set; }
    public DateTime LastModified { get; set; }
    public bool Active { get; set; } = false;
    public List<Video>? Videos { get; set; }
    public List<User>? Followers { get; set; }
    public List<Posts>? Posts { get; set; }
}