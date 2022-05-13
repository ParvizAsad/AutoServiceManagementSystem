using AutoServiceManagment.AuthenticationService.Contracts;
using AutoServiceManagment.AuthenticationService.Models;
using AutoServiceManagment.DomainModels.Entities;
using AutoServiceManagment.Repository.DataContext;
using AutoServiceManagment.Repository.Repository;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace AutoServiceManagment.AuthenticationService
{
    public class AuthService : IAuthService
    {
        private readonly JwtSetting _jwtSetting;
        private readonly UserManager<User> _userManager;

        private readonly RoleManager<IdentityRole> _roleManager;

        private readonly AppDbContext _dbContext;
        public AuthService(IOptions<JwtSetting> jwtSetting, UserManager<User> userManager, RoleManager<IdentityRole> roleManager, AppDbContext dbContext)
        {
            _jwtSetting = jwtSetting.Value;

            _userManager = userManager;

            _roleManager = roleManager;
            _dbContext = dbContext;
        }

        public string GetToken(CredentialModel credentialModel)
        {
            throw new NotImplementedException();
        }

        public async Task<string> GetTokenAsync(CredentialModel credentialModel)
        {
            var user = await _userManager.FindByNameAsync(credentialModel.Username);
            if (user == null)
            {
                throw new Exception("Invalid Credentials");
            }
            if (await _userManager.CheckPasswordAsync(user, credentialModel.Password))
            {
                var jwtSecurityToken = CreateJwtToken(user);
                var token = new JwtSecurityTokenHandler().WriteToken(await jwtSecurityToken);

                return token;
            }
            throw new Exception("Invalid Credentials");

        }
        private async Task<JwtSecurityToken> CreateJwtToken(User user)
        {
            var userClaims = await _userManager.GetClaimsAsync(user);
            var roles = await _userManager.GetRolesAsync(user);

            var roleClaims = new List<Claim>();
            for (int i = 0; i < roles.Count; i++)
            {
                roleClaims.Add(new Claim("roles", roles[i]));
            }
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim("uid", user.Id)
            }
            .Union(userClaims)
            .Union(roleClaims);

            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSetting.Key));
            var signingCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256);
            var jwtSecurityToken = new JwtSecurityToken(
                    issuer: _jwtSetting.Issuer,
                audience: _jwtSetting.Audience,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(_jwtSetting.DurationInMinutes),
                signingCredentials: signingCredentials);
            return jwtSecurityToken;
        }
    }
}

