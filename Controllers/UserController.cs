using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;


[ApiController]
[Route("[controller]/[action]")]

public class UserController(UserManager<User> userManager, UserDbContext dbContext, SignInManager<User> signInManager, IConfiguration configuration, IAuthService authService) : ControllerBase
{
    private readonly UserManager<User> _userManager = userManager;
    private readonly UserDbContext _dbContext = dbContext;
    private readonly SignInManager<User> _signInManager = signInManager;
    private readonly IConfiguration _configuration = configuration;
    private readonly IAuthService _authService = authService;


    [HttpPost]
    public async Task<IActionResult> SignUp([FromBody] UserRegistrationDTO model)
    {
        if (!ModelState.IsValid)
        {
            var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage).ToList();
            return BadRequest(new { Errors = errors });
        }
        if (await _userManager.FindByEmailAsync(model.Email).ConfigureAwait(false) != null)
            return BadRequest(new { Errors = new List<string> { "Пользователь с таким email'ом уже существует!" } });
        var user = new User
        {
            UserName = model.Username,
            Email = model.Email
        };
        var result = await _userManager.CreateAsync(user, model.Password);
        if (!result.Succeeded)
            return BadRequest(result.Errors);
        return Ok();
    }

    [HttpPost]
    public async Task<IActionResult> SignIn([FromBody] UserLoginDTO model)
    {
        if (!ModelState.IsValid)
        {
            var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage).ToList();
            return BadRequest(new { Errors = errors });
        }
        var user = await _userManager.FindByEmailAsync(model.Email);
        if (user == null)
        {
            return BadRequest(new { Errors = new List<string> { "Данный email не зарегестрирован" } });
        }
        var passwordCheck = await _signInManager.CheckPasswordSignInAsync(user, model.Password, false);
        if (!passwordCheck.Succeeded)
        {
            return BadRequest(new { Errors = new List<string> { "Неверный пароль!" } });
        }
        var token = _authService.GenerateJwtToken(user);
        var refreshToken = _authService.GenerateRefreshToken();
        user.RefreshToken = refreshToken;
        user.RefreshTokenExpiryTime = DateTime.Now.AddDays(7);
        await _userManager.UpdateAsync(user);

        return Ok(new { Token = token, RefreshToken = refreshToken });
    }

    [HttpPost]
    public async Task<IActionResult> RefreshToken([FromBody] TokenRequestDTO tokenRequest)
    {
        var principal = _authService.GetPrincipalFromExpiredToken(tokenRequest.Token, _configuration);
        if (principal == null)
        {
            return BadRequest("Invalid token");
        }
        var user = await _userManager.FindByNameAsync(principal.Identity.Name);
        if (user == null || user.RefreshToken != tokenRequest.RefreshToken)
        {
            return BadRequest("Invalid refresh token");
        }
        var newToken = _authService.GenerateJwtToken(user);
        await _authService.UpdateRefreshToken(user);

        return new OkObjectResult(new { Token = newToken, RefreshToken = user.RefreshToken });
    }

    [Authorize]
    [HttpGet]
    public async Task<IActionResult> Profile()
    {
        var userEmail = User.FindFirstValue(ClaimTypes.NameIdentifier);

        var user = await _userManager.FindByEmailAsync(userEmail);
        if (user == null)
        {
            return NotFound(new { Errors = new List<string> { "Пользователь не найден!" } });
        }
        var profileDto = new UserProfileDTO
        {
            Username = user.UserName,
            Email = user.Email,
            ProfileImage = user.ProfileImage
        };

        return Ok(profileDto);
    }

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> UploadPicture(IFormFile file)
    {
        if (file != null && file.Length > 0)
        {
            using (var memoryStream = new MemoryStream())
            {
                await file.CopyToAsync(memoryStream);

                var userEmail = User.FindFirstValue(ClaimTypes.NameIdentifier);
                var user = await _userManager.FindByEmailAsync(userEmail);

                user.ProfileImage = memoryStream.ToArray();

                var result = await _userManager.UpdateAsync(user);

                if (result.Succeeded)
                {
                    return Ok("Profile");
                }
            }
        }
        return BadRequest("Error");
    }

    [HttpGet]
    public async Task<IActionResult> Get(CancellationToken ct)
    {
        var user = await _dbContext.Users.ToListAsync(ct);
        return Ok(user);
    }


}