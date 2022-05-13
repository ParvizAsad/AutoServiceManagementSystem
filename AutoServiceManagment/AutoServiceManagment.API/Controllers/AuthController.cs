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
            var token = _authService.GetToken(credentialModel);
            return Ok(token);
        }
    }
}
