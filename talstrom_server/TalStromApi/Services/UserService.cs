using System;
using Microsoft.EntityFrameworkCore;
using TalStromApi.Models;

public class UserService : IUserService
{
    private readonly TalStromDbContext _context;

    public UserService(TalStromDbContext context)
    {
        _context = context;
    }

    public async Task<User> GetUserAsync(int userId)
    {
        return await _context.User.FindAsync(userId);
    }

    public async Task<List<User>> GetFollowersAsync(int userId)
    {
        var user = await _context.User.Include(u => u.Followers).FirstOrDefaultAsync(u => u.Id == userId);
        if (user == null) return new List<User>();

        var followers = new List<User>();
        foreach (var followerUserName in user.Followers)
        {
            var followerUser = await _context.User.FirstOrDefaultAsync(u => u.UserName == followerUserName);
            if (followerUser != null)
            {
                followers.Add(followerUser);
            }
        }

        return followers;
    }

    public async Task<List<User>> GetFollowingAsync(int userId)
    {
        var user = await _context.User.Include(u => u.Following).FirstOrDefaultAsync(u => u.Id == userId);
        if (user == null) return new List<User>();

        var following = new List<User>();
        foreach (var followingUserName in user.Following)
        {
            var followingUser = await _context.User.FirstOrDefaultAsync(u => u.UserName == followingUserName);
            if (followingUser != null)
            {
                following.Add(followingUser);
            }
        }

        return following;
    }

    public async Task<bool> IsFollowingAsync(int followerId, int followingId)
    {
        var follower = await GetUserAsync(followerId);
        var following = await GetUserAsync(followingId);

        if (follower == null || following == null) return false;

        return follower.Following.Contains(following.UserName) && following.Followers.Contains(follower.UserName);
    }
}
