namespace TalStromApi.Models;

public class User
{
  public int Id { get; set; }
  public string Name { get; set; }
  public string Email { get; set; }
  public string Image { get; set; }
  
  public List<string> Videos { get; set; }
  public List<User>? Followers { get; set; }
  public List<Posts> Posts { get; set; }
}