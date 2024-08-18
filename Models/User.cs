using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

public class User : IdentityUser<long>
{
    [Key]
    public override long Id { get; set; }
    public override string? UserName { get; set; }
    public override string? Email { get; set; }
    public override string? PasswordHash { get; set; }
    public string? RefreshToken { get; set; }
    private DateTime _refreshTokenExpiryTime;
    public DateTime RefreshTokenExpiryTime
    {
        get => _refreshTokenExpiryTime;
        set => _refreshTokenExpiryTime = DateTime.SpecifyKind(value, DateTimeKind.Utc);
    }
    public byte[]? ProfileImage { get; set; }
}