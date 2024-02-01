using TalStromApi.Models;

namespace TalStromApi.DTO;

public record PostsRequestDTO
{
    public int Id { get; set; }
    public PostType PostType { get; set; }
    public string Title { get; set; }
    public string Content { get; set; }
    public string UserSub { get; set; }
}