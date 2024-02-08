namespace TalStromApi.DTO;

public record EditUserDTO
{
    public string UserName { get; set; }
    public string Technologies { get; set; }
    public string Bio { get; set; }
    public string Position { get; set; }
    public DateTime LastModified { get; set; } = DateTime.Now;
}