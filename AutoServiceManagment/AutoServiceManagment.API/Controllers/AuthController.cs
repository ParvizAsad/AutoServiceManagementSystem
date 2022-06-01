using AutoServiceManagment.AuthenticationService.Models;
using AutoServiceManagment.Services.Services.Contracts;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace AutoServiceManagment.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _service;

        public AuthController(IAuthService service)
        {
            _service = service;
        }


        [HttpPost]
        [Route("Login")]
        public async Task<ActionResult> Login([FromBody] CredentialModel credentialModel)
        {
            await _service.LoginAsync(credentialModel);
            return Ok();
        }

        [HttpPost]
        [Route("Register")]
        public async Task<ActionResult> Register([FromBody] RegisterModel registerModel)
        {
            await _service.RegisterAsync(registerModel);
            return Ok();
        }

        [HttpPost]
        [Route("Logout")]
        public async Task<ActionResult> Logout()
        {
            await _service.LogoutAsync();
            return Ok();
        }

        [HttpPost]
        [Route("ResetPassword")]
        public async Task<ActionResult> ResetPasswordAsync([FromBody] ResetPasswordModel resetPasswordModel)
        {
            await _service.ResetPasswordAsync(resetPasswordModel);
            return Ok();

        }

        //private string GenerateJwtToken(User user)
        //{
        //    var tokenHandler = new JwtSecurityTokenHandler();
        //    var key = Encoding.ASCII.GetBytes(_configuration["Jwt:SigningKey"]);

        //    var claims = new List<Claim>
        //    {
        //        new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
        //        new Claim(ClaimTypes.Email, user.Email),
        //    };

        //    //if (user.rol.Count > 0)
        //    //{
        //    //    claims.AddRange(user.Roles.Select(role => new Claim(ClaimTypes.Role, role)));
        //    //}

        //    var tokenDescriptor = new SecurityTokenDescriptor
        //    {
        //        Subject = new ClaimsIdentity(claims),
        //        Issuer = "example.com",
        //        Audience = "example.com",
        //        Expires = DateTime.UtcNow.AddHours(1),
        //        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        //    };

        //    var token = tokenHandler.CreateToken(tokenDescriptor);
        //    return tokenHandler.WriteToken(token);
        //}
    }

   
}

