

using System.Text.Json.Serialization;

namespace TalStromApi.Models;

public class UserInvitation
{
    public int Id { get; set; }
    public string Email { get; set; }
    public string Role { get; set; }   
    
    [JsonIgnore]
    public string InvitationToken { get; set; }
}