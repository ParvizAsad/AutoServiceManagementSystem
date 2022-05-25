using AutoServiceManagment.AuthenticationService.Models;
using AutoServiceManagment.DomainModels.Entities;
using AutoServiceManagment.Services.Services.Contracts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using AutoServiceManagment.Infrastructure.Data;
using AutoServiceManagment.Repository.DataContext;

namespace AutoServiceManagment.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly AppDbContext _dbContext;
        public AuthController(IConfiguration configuration, RoleManager<IdentityRole> roleManager , AppDbContext dbContext, UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _configuration = configuration;
            _signInManager = signInManager;
            _userManager = userManager;
            _roleManager = roleManager;
            _dbContext = dbContext;
        }


        [HttpPost]
        [Route("Login")]
        public async Task<ActionResult> Login([FromBody] CredentialModel userLogin)
        {


            var user = await _userManager.FindByEmailAsync(userLogin.Email);

            if (user is null)
            {
                return NotFound(
                new 
                {
                    Status = "404",
                    Message = "Invalid password or email!"
                });
            }

            var response = await _userManager.CheckPasswordAsync(user, userLogin.Password);

            if (response == null)
            {
                return NotFound(new
                {
                    message = "username or password is not correct"
                });
            }

            var token = GenerateJwtToken(user);
            return Ok(new LoginResult
            {
                UserId = user.Id,
                AuthToken = token
            });
        }

        [HttpPost]
        [Route("Register")]
        public async Task<ActionResult> Register([FromBody] RegisterModel registerModel)
        {

            var user = new User
            {
                Email = registerModel.Email,
                UserName = registerModel.Username,
                FullName = registerModel.FullName
            };
          var result=  await _userManager.CreateAsync(user, registerModel.PassWord);
            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(user, "User");

                return Ok(new 
                {
                    Status = "200",
                    Message = $"Student with the username {user.UserName} has succesfully registered"
                });
            }
            else
            {
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(error.Code, error.Description);
                }
                return ValidationProblem();
            }

            //var result = await _userManager.CreateAsync(user, registerModel.PassWord);

            //if (result.Succeeded)
            //{
            //    await _userManager.AddToRoleAsync(user, RoleConstants.UserRole);

            //    return Ok(new 
            //    {
            //        Status = "200",
            //        Message = $"Student with the username {user.UserName} has succesfully registered"
            //    });
            //}
            //else
            //{
            //    foreach (var error in result.Errors)
            //    {
            //        ModelState.AddModelError(error.Code, error.Description);
            //    }
            //    return ValidationProblem();
            //}
        }


        private string GenerateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:SigningKey"]);

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
            };

            //if (user.rol.Count > 0)
            //{
            //    claims.AddRange(user.Roles.Select(role => new Claim(ClaimTypes.Role, role)));
            //}

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Issuer = "example.com",
                Audience = "example.com",
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }

   
}

