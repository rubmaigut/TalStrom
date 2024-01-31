using Google.Apis.Auth.OAuth2;
using Google.Apis.Gmail.v1;
using Google.Apis.Services;
using System.Net.Mail; 
using Microsoft.AspNetCore.Identity.UI.Services;
using TalStromApi.utils;

namespace TalStromApi.Utils
{
    public class EmailSender: IMailSender
    {
        public async Task SendEmailAsync(string toEmail, string subject, string body)
        {
            UserCredential credential = await GoogleWebAuthorizationBroker.AuthorizeAsync(
                new ClientSecrets
                {
                    ClientId = "630838583753-lsl1k479pidbjbsdpoc43hsv265tsfcc.apps.googleusercontent.com",
                    ClientSecret = "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"
                },
                new[] { GmailService.Scope.MailGoogleCom },
                "user",
                CancellationToken.None);

            // Create the Gmail service.
            var service = new GmailService(new BaseClientService.Initializer()
            {
                HttpClientInitializer = credential,
                ApplicationName = "Your Application Name",
            });

            var mailMessage = new MailMessage()
            {
                From = new MailAddress("maidelin.rubio@appliedtechnology.se"), 
                Subject = subject,
                Body = body,
                IsBodyHtml = true
            };
            mailMessage.To.Add(new MailAddress(toEmail));

            var mimeMessage = MimeKit.MimeMessage.CreateFromMailMessage(mailMessage);
            var rawMessage = Base64UrlEncode(mimeMessage.ToString());

            var message = new Google.Apis.Gmail.v1.Data.Message
            {
                Raw = rawMessage
            };

            // Send the message.
            await service.Users.Messages.Send(message, "me").ExecuteAsync();
        }

        private static string Base64UrlEncode(string input)
        {
            var inputBytes = System.Text.Encoding.UTF8.GetBytes(input);
            // Special "url-safe" base64 encode.
            return Convert.ToBase64String(inputBytes)
                .Replace('+', '-')
                .Replace('/', '_')
                .Replace("=", "");
        }
    }
}
