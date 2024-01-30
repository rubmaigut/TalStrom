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
  public  PostType PostType { get; set; }
  public string Title { get; set; }
  public string Content { get; set; }
}