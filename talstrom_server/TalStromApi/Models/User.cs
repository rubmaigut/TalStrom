namespace TalStromApi.Models;

public enum Role {
  Customer,
  Developer
}

public class User
{
  public int Id { get; set; }
  public string Name { get; set; }
  public Role Role { get; set; }
  public string Password { get; set; }
  public List<string> Videos { get; set; }
  public List<User>? Developers { get; set; }
  public List<Posts> Posts { get; set; } 
}