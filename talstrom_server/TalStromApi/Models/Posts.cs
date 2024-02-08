namespace TalStromApi.Models;

public enum PostType
{
  JobPost,
  Article,
  Thought,
  Challenge
}

public class Posts
{
  public int Id { get; set; }
  public PostType PostType { get; set; }
  public string Author { get; set; }
  public string? RecruiterName { get; set; } 
  public string? RecruiterEmail { get; set; }
  public string Title { get; set; }
  public string Content { get; set; }
  public int UserId { get; set; }
  public bool? JobActive { get; set; }
  public DateTime? CreatedAt { get; set; } = DateTime.Now;
  public ICollection<ApplicationForm> ApplicationForms { get; set; }
  
}