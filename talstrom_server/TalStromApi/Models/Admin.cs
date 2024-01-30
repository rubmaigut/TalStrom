namespace TalStromApi.Models;

public class Admin
{
  public int Id { get; set; }
  public string Email { get; set; }
  public string Password { get; set; }
  public string Name { get; set; }
  public List<User> Users { get; set; }
}