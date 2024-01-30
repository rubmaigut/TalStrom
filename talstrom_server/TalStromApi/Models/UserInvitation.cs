namespace TalStromApi.Models;

public class UserInvitation
{
    public int Id { get; set; }
    public string Email { get; set; }
    public string Role { get; set; }   
    public string InvitationToken { get; set; }
}