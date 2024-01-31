using Microsoft.AspNetCore.Mvc;
using TalStromApi.DTO;
using TalStromApi.Models;
using TalStromApi.utils;

namespace TalStromApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    
    public class UserInvitationController : ControllerBase
    {
        private readonly IMailSender _emailSender;
        private readonly TalStromDbContext _context;

        public UserInvitationController(IMailSender emailSender, TalStromDbContext context)
        {
            _emailSender = emailSender;
            _context = context;
        }

        [HttpPost("invite")]
        public async Task<IActionResult> InviteUser([FromBody] UserInvitationDTO invitationDto)
        {
            try
            {
                var invitation = new UserInvitation
            {
                Email = invitationDto.Email,
                Role = invitationDto.Role,
                InvitationToken = TokenGenerator.GenerateInvitationToken() // Generate token
            };

            // Construct the invitation link
            var invitationLink = $"https://tal-strom.vercel.app/accept-invitation?token={invitation.InvitationToken}";

            // Save the invitation details
            _context.UserInvitations.Add(invitation);
            _context.SaveChanges();

            // Send invitation email
            await _emailSender.SendEmailAsync(invitation.Email, "You're Invited!", $"Please use this link to join as a {invitation.Role}: {invitationLink}");

            return Ok("Invitation sent successfully.");
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return StatusCode(500, "Internal Server Error: " + ex.Message);

            }
        }
        private void SaveInvitationDetails(UserInvitation invitation, string token)
        {
            // Set the invitation token
            invitation.InvitationToken = token;
            
            // Add the invitation to the DbContext
            _context.UserInvitations.Add(invitation);

            // Save changes to the database
            _context.SaveChanges();
        }
        private UserInvitation GetInvitationByToken(string token)
        {
            return _context.UserInvitations.FirstOrDefault(ui => ui.InvitationToken == token);
        }
        private void SaveNewUser(User user)
        {
            // Assuming _context is your DbContext
            _context.User.Add(user);
            _context.SaveChanges();
        }

        [HttpGet("accept-invitation")]
        public async Task<IActionResult> AcceptInvitation(string token, [FromQuery] User googleUserInfo)
        {
            // Verify the token in the InviteUser table
            var invitation = GetInvitationByToken(token);
            if (invitation == null)
            {
                return BadRequest("Invalid or expired invitation token.");
            }

            // Create a new User entry with the Google user info and role from the invitation
            var newUser = new User
            {
                Name = googleUserInfo.Name,
                Email = googleUserInfo.Email,
                Image = googleUserInfo.Image
                // Other fields like Videos, Followers, Posts can be set as per your logic
            };

            // Save the new user to your database
            SaveNewUser(newUser);

            // Optionally, mark the invitation as accepted in the InviteUser table

            return Ok("User successfully created.");
        }

    }
    
}


