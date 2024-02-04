namespace TalStromApi.DTO;

public record UserPostReq
{
    public string Name { get; set; }
    public string Email { get; set; }
    public string Picture { get; set; }
    public string Sub { get; set; }
}