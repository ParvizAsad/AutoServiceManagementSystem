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
using AutoServiceManagment.Repository.Data;
using AutoServiceManagment.Repository.DataContext;
using Microsoft.AspNetCore.Cors;

namespace AutoServiceManagment.API.Controllers
{
    [EnableCors("AllowCors"), Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IMapper _mapper;
        private readonly AppDbContext _dbContext;
        public AuthController(IConfiguration configuration, IMapper mapper, RoleManager<IdentityRole> roleManager, AppDbContext dbContext, UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _configuration = configuration;
            _signInManager = signInManager;
            _userManager = userManager;
            _mapper = mapper;
            _roleManager = roleManager;
            _dbContext = dbContext;
        }

        [HttpGet]
        [Route("GetAllUser")]
        public async Task<IList<User>> GetAllUser()
        {
            var users = await _userManager.Users.ToListAsync();
            return _mapper.Map<List<User>>(users);
        }

        [HttpPost]
        [Route("Login")]
        public async Task<ActionResult> Login([FromBody] CredentialModel userLogin)
        {


            var user = await _userManager.FindByNameAsync(userLogin.Username);

            if (user is null)
            {
                return NotFound(
                new
                {
                    Status = "404",
                    Message = "Invalid password or email!"
                });
            }

            var response = await _userManager.CheckPasswordAsync(user, userLogin.PassWord);

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
            var existUser = await _userManager.FindByNameAsync(registerModel.Username);

            if (existUser!=null)
            {
                return NotFound(
                new
                {
                    Status = "404",
                    Message = "Invalid password or email!"
                });
            }

            var user = new User
            {
                Email = registerModel.Email,
                UserName = registerModel.Username,
                FullName = registerModel.FullName
            };
            var result = await _userManager.CreateAsync(user, registerModel.PassWord);
            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(user, RoleConstants.UserRole);
                await _signInManager.SignInAsync(user, false);

                return Ok(new
                {
                    Status = "200",
                    Message = $"{user.UserName} has succesfully registered"
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

        }
        
        private async Task<string> GenerateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["JWT:Key"]);
            var roles = await _userManager.GetRolesAsync(user);

            var claims = new List<Claim>
            {
              new Claim (ClaimTypes.Email,user.Email),
              new Claim(ClaimTypes.Sid, user.Id.ToString()),
            };
            foreach (var role in roles)
                 {
                        claims.Add(new Claim(ClaimTypes.Role, role));
                }

            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Key"]));
            var signingCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256);
                var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Issuer = "AutoServiceManagementApi",
                Audience = "AutoServiceManagementApi",
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = signingCredentials
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

       [HttpDelete("BlockUser/{id?}")]
        public async Task<IActionResult> DeleteUserAsync([FromRoute] string id)
        {
            var users = await _userManager.FindByIdAsync(id);
            if (users.IsDeleted) { users.IsDeleted = false; }
            else if (!users.IsDeleted) { 
                users.IsDeleted = true;
            }
            await _userManager.UpdateAsync(users);

            return Ok();
        }
        
        [HttpGet]
        [Route("GetAllRole")]
        public async Task<IList<IdentityRole>> GetAllRole()
        {
            var roles = await _roleManager.Roles.ToListAsync();
            return roles;

        }

        [HttpGet]
        [Route("GetAllUserRole")]
        public async Task<IList<IdentityUserRole<string>>> GetAllUserRole()
        {
            //var userRoles = await _dbContext.UserRoles.ToListAsync();
            var roles = await _roleManager.Roles.ToListAsync();
            var users = await _userManager.Users.ToListAsync();
            var userRoles = await _dbContext.UserRoles.Include(x => x.UserId).Include(x=>x.RoleId).ToListAsync();
            return userRoles;
        }

        //[HttpPut("ChangeRole/{id?}")]
        //public async Task<IActionResult> ChangeRole([FromRoute] string id, string newRole)
        //{
        //    var user = await _userManager.FindByIdAsync(id);
        //    string exRole = (await _userManager.GetRolesAsync(user)).FirstOrDefault();


        //}

    }


}

