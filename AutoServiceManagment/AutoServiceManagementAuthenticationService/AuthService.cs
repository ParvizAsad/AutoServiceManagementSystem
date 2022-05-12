using AutoServiceManagment.AuthenticationService.Contracts;
using AutoServiceManagment.AuthenticationService.Models;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AutoServiceManagment.AuthenticationService
{
    public class AuthService : IAuthService
    {
        private readonly JwtSetting _jwtSetting;

        public AuthService(IOptions<JwtSetting> jwtSetting)
        {
            _jwtSetting = jwtSetting.Value;
        }

        public string GetToken(CredentialModel credentialModel)
        {
            throw new NotImplementedException();
        }

        //public async Task<string> GetTokenAsync(CredentialModel credentialModel)
        //{
        //    var authenticationModel = new AuthenticationModel();
        //    var user = await _userManager.FindByEmailAsync(model.Email);
        //    if (user == null)
        //    {
        //        authenticationModel.IsAuthenticated = false;
        //        authenticationModel.Message = $"No Accounts Registered with {model.Email}.";
        //        return authenticationModel;
        //    }
        //    if (await _userManager.CheckPasswordAsync(user, model.Password))
        //    {
        //        authenticationModel.IsAuthenticated = true;
        //        JwtSecurityToken jwtSecurityToken = await CreateJwtToken(user);
        //        authenticationModel.Token = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);
        //        authenticationModel.Email = user.Email;
        //        authenticationModel.UserName = user.UserName;
        //        var rolesList = await _userManager.GetRolesAsync(user).ConfigureAwait(false);
        //        authenticationModel.Roles = rolesList.ToList();
        //        return authenticationModel;
        //    }
        //    authenticationModel.IsAuthenticated = false;
        //    authenticationModel.Message = $"Incorrect Credentials for user {user.Email}.";
        //    return authenticationModel;
        //}
        //private async Task<JwtSecurityToken> CreateJwtToken(ApplicationUser user)
        //{
        //    var userClaims = await _userManager.GetClaimsAsync(user);
        //    var roles = await _userManager.GetRolesAsync(user);
        //    var roleClaims = new List<Claim>();
        //    for (int i = 0; i < roles.Count; i++)
        //    {
        //        roleClaims.Add(new Claim("roles", roles[i]));
        //    }
        //    var claims = new[]
        //    {
        //        new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
        //        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        //        new Claim(JwtRegisteredClaimNames.Email, user.Email),
        //        new Claim("uid", user.Id)
        //    }
        //    .Union(userClaims)
        //    .Union(roleClaims);
        //    var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwt.Key));
        //    var signingCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256);
        //    var jwtSecurityToken = new JwtSecurityToken(
        //        issuer: _jwt.Issuer,
        //        audience: _jwt.Audience,
        //        claims: claims,
        //        expires: DateTime.UtcNow.AddMinutes(_jwt.DurationInMinutes),
        //        signingCredentials: signingCredentials);
        //    return jwtSecurityToken;
        //}
    }
}

