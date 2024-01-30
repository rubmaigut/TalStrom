namespace TalStromApi.utils;

public interface IMailSender
{
    Task SendEmailAsync(string toEmail, string subject, string body);
}