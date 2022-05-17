using AutoServiceManagment.AuthenticationService.Contracts;
using AutoServiceManagment.AuthenticationService.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace AutoServiceManagment.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("token")]
        public async Task<IActionResult> Token([FromBody] CredentialModel credentialModel)
        {
            var token =await _authService.GetTokenAsync(credentialModel);
            return Ok(token);
        }

        //[HttpPost]

        //public async Task<IActionResult> Register([FromBody] RegisterModel registerViewModel)
        //{

        //    await _authService.RegisterAsync(registerViewModel);
        //    return Ok();

        //}

        //[HttpPost]
        //public async Task<IActionResult> Login([FromBody] CredentialModel credentialModel)
        //{

        //    await _authService.LoginAsync(credentialModel);
        //    return Ok();

        //}

        //[HttpPost]
        //public async Task<IActionResult> Logout()
        //{

        //    await _authService.LogoutAsync();
        //    return Ok();

        //}

    }
}
