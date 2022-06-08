using AutoServiceManagment.AuthenticationService.Models;
using AutoServiceManagment.DomainModels.Entities;
using AutoServiceManagment.Services.Services.Contracts;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using AutoServiceManagment.Repository.DataContext;
using Microsoft.Extensions.Options;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.Extensions.Configuration;
using System.Text;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;

namespace AutoServiceManagment.Services.Services
{
    public class AuthService : IAuthService
    {
    //    private readonly JwtSetting _jwtSetting;

    //    private readonly UserManager<User> _userManager;

    //    private readonly RoleManager<IdentityRole> _roleManager;

    //    private readonly SignInManager<User> _signInManager;
    //    private readonly IConfiguration _configuration;

    //    private readonly AppDbContext _dbContext;

    //    public AuthService(IConfiguration configuration, IOptions<JwtSetting> jwtSetting, UserManager<User> userManager, RoleManager<IdentityRole> roleManager, AppDbContext dbContext, SignInManager<User> signInManager = null)
    //    {
    //        _jwtSetting = jwtSetting.Value;

    //        _userManager = userManager;
    //        _configuration = configuration;

    //        _roleManager = roleManager;

    //        _dbContext = dbContext;

    //        _signInManager = signInManager;
    //    }

    //    public Task<IList<User>> GetAllUsersAsync()
    //    {
    //        throw new NotImplementedException();
    //    }

    //    public Task<string> GetTokenAsync(CredentialModel credentialModel)
    //    {
    //        throw new NotImplementedException();
    //    }

    //    public Task<string> CreateJwtToken(User user)
    //    {
    //        var tokenHandler = new JwtSecurityTokenHandler();
    //        var key = Encoding.ASCII.GetBytes(_configuration["Jwt:SigningKey"]);

    //        var claims = new List<Claim>
    //        {
    //            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
    //            new Claim(ClaimTypes.Email, user.Email),
    //        };

    //        //if (user.rol.Count > 0)
    //        //{
    //        //    claims.AddRange(user.Roles.Select(role => new Claim(ClaimTypes.Role, role)));
    //        //}

    //        var tokenDescriptor = new SecurityTokenDescriptor
    //        {
    //            Subject = new ClaimsIdentity(claims),
    //            Issuer = "example.com",
    //            Audience = "example.com",
    //            Expires = DateTime.UtcNow.AddHours(1),
    //            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
    //        };

    //        var token = tokenHandler.CreateToken(tokenDescriptor);
    //        return tokenHandler.WriteToken(token);
    //    }

    //    public async Task LoginAsync(CredentialModel credentialModel)
    //    {
    //        var existUser = await _userManager.FindByNameAsync(credentialModel.Username);

    //        if (existUser == null)
    //        {
    //            throw new Exception("Incorrect username or password");

    //        }

    //        var result = await _signInManager.PasswordSignInAsync(existUser, credentialModel.Password, credentialModel.RememberMe, true);

    //        if (!result.Succeeded)
    //        {
    //            throw new Exception("Can not be signed in");
    //        }

    //        if (result.IsLockedOut)
    //        {
    //            throw new Exception("You are locked out");
    //        }

    //    }

    //    public async Task LogoutAsync()
    //    {
    //        await _signInManager.SignOutAsync();

    //    }

    //    public async Task ResetPasswordAsync(ResetPasswordModel resetPasswordModel)
    //    {
    //        var existUser = await _userManager.FindByNameAsync(resetPasswordModel.Username);

    //        if (existUser == null)
    //        {
    //            throw new Exception("Incorrect username or password");

    //        }

    //        var result = await _userManager.ChangePasswordAsync(existUser, resetPasswordModel.oldPassword, resetPasswordModel.newPassword);

    //        if (!result.Succeeded)
    //        {
    //            throw new Exception("Password can not be reset");
    //        }

    //    }

    //    public async Task RegisterAsync(RegisterModel registerModel)
    //    {

    //        var ExistUser = await _userManager.FindByNameAsync(registerModel.Username);

    //        if (ExistUser != null)
    //        {
    //            throw new Exception("User with this username already exits");

    //        }

    //        var user = new User()
    //        {
    //            FullName = registerModel.FullName,

    //            UserName = registerModel.Username,

    //            Email = registerModel.Email,
    //        };

    //        var result = await _userManager.CreateAsync(user, registerModel.PassWord);

    //        if (!result.Succeeded)
    //        {
    //            throw new Exception("User can not be created");

    //        }

    //    }

        #region MyRegion

        //    public async Task<string> GetTokenAsync(CredentialModel credentialModel)
        //    {
        //        var user = await _userManager.FindByNameAsync(credentialModel.Username);
        //        if (user == null)
        //        {
        //            throw new Exception("Invalid Credentials");
        //        }
        //        if (await _userManager.CheckPasswordAsync(user, credentialModel.Password))
        //        {
        //            throw new Exception("Invalid Credentials");
        //        }
        //        var jwtSecurityToken = CreateJwtToken(user);
        //        var token = new JwtSecurityTokenHandler().WriteToken(await jwtSecurityToken);

        //        return token;

        //    }
        //    private async Task<JwtSecurityToken> CreateJwtToken(User user)
        //    {
        //        var userClaims = await _userManager.GetClaimsAsync(user);
        //        var roles = await _userManager.GetRolesAsync(user);

        //        var roleClaims = new List<Claim>();
        //        for (int i = 0; i < roles.Count; i++)
        //        {
        //            roleClaims.Add(new Claim("roles", roles[i]));
        //        }
        //        var claims = new[]
        //        {
        //            new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
        //            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        //            new Claim(JwtRegisteredClaimNames.Email, user.Email),
        //            new Claim("uid", user.Id)
        //        }
        //        .Union(userClaims)
        //        .Union(roleClaims);

        //        var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSetting.Key));
        //        var signingCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256);
        //        var jwtSecurityToken = new JwtSecurityToken(
        //                issuer: _jwtSetting.Issuer,
        //            audience: _jwtSetting.Audience,
        //            claims: claims,
        //            expires: DateTime.UtcNow.AddMinutes(_jwtSetting.DurationInMinutes),
        //            signingCredentials: signingCredentials);
        //        return jwtSecurityToken;
        //    }



        #endregion
    }
}
