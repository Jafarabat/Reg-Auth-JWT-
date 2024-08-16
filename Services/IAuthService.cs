using System.Security.Claims;

public interface IAuthService
{
    string GenerateJwtToken(User user);
    string GenerateRefreshToken();
    ClaimsPrincipal GetPrincipalFromExpiredToken(string token, IConfiguration config);
    Task UpdateRefreshToken(User user);
}