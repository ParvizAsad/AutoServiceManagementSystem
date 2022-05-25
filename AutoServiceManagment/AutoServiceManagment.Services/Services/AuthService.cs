using AutoServiceManagment.AuthenticationService.Models;
using AutoServiceManagment.Services.Services.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AutoServiceManagment.Services.Services
{
    public class AuthService 
    {
        public Task<string> GetTokenAsync(CredentialModel credentialModel)
        {
            throw new NotImplementedException();
        }

        public Task LoginAsync(CredentialModel credentialModel)
        {
            throw new NotImplementedException();
        }

        public Task LogoutAsync()
        {
            throw new NotImplementedException();
        }

        public Task RegisterAsync(RegisterModel registerViewModel)
        {
            throw new NotImplementedException();
        }

        #region MyRegion
        //    public class AuthService : IAuthService
        //{
        //    private readonly JwtSetting _jwtSetting;

        //    private readonly UserManager<User> _userManager;

        //    private readonly RoleManager<IdentityRole> _roleManager;

        //    private readonly SignInManager<User> _signInManager;

        //    private readonly AppDbContext _dbContext;
        //    public AuthService(IOptions<JwtSetting> jwtSetting, UserManager<User> userManager, RoleManager<IdentityRole> roleManager, AppDbContext dbContext, SignInManager<User> signInManager=null)
        //    {
        //        _jwtSetting = jwtSetting.Value;

        //        _userManager = userManager;

        //        _roleManager = roleManager;

        //        _dbContext = dbContext;

        //        _signInManager = signInManager;
        //    }
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
        //    public async Task RegisterAsync(RegisterModel registerModel)
        //    {

        //        var ExistUser = await _userManager.FindByNameAsync(registerModel.Username);

        //        if (ExistUser != null)
        //        {
        //            throw new Exception("User with this username already exits");

        //        }

        //        var user = new User()
        //        {
        //            FullName = registerModel.Fullname,

        //            UserName = registerModel.Username,

        //            Email = registerModel.Email,
        //        };

        //        var result = await _userManager.CreateAsync(user, registerModel.Password);

        //        if (!result.Succeeded)
        //        {
        //            throw new Exception("User can not be created");

        //        }

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

        //    public async Task LogoutAsync()
        //    {
        //        await _signInManager.SignOutAsync();

        //    }


        //}

        #endregion
    }
}
