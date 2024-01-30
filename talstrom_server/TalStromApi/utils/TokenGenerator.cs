using System.Security.Cryptography;

namespace TalStromApi.utils
{
    public class TokenGenerator
    {
        public static string GenerateInvitationToken()
        {
            using (var rng = new RNGCryptoServiceProvider())
            {
                var bytes = new byte[16]; // 128 bit buffer
                rng.GetBytes(bytes);
                return Convert.ToBase64String(bytes);
            }
        }
    }
}


