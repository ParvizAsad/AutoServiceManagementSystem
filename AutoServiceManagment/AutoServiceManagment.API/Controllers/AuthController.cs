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

<<<<<<< Updated upstream
        //[HttpPost]

        //public async Task<IActionResult> RegisterAsync([FromBody] RegisterModel registerViewModel)
        //{

        //    await _authService.RegisterAsync(registerViewModel);
        //    return Ok();

        //}

        //[HttpPost]
        //public async Task<IActionResult> LoginAsync([FromBody] CredentialModel credentialModel)
        //{

        //    await _authService.LoginAsync(credentialModel);
        //    return Ok();

        //}

=======
        public async Task<IActionResult> Register([FromBody] RegisterModel registerModel)
        {
            var token = _authService.Register(registerModel);
            return Ok();
        }
        public async Task<IActionResult> Login([FromBody] CredentialModel credentialModel)
        {
            var token = _authService.Login(credentialModel);
            return Ok();
        }
>>>>>>> Stashed changes
    }
}
