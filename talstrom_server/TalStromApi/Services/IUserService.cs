using TalStromApi.Models;

public interface IUserService
{
    Task<User> GetUserAsync(int userId);
    Task<List<User>> GetFollowersAsync(int userId);
    Task<List<User>> GetFollowingAsync(int userId);
    Task<bool> IsFollowingAsync(int followerId, int followingId);
}
