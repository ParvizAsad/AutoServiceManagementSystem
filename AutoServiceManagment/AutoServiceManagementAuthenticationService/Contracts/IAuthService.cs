using AutoServiceManagment.AuthenticationService.Models;
using System.Threading.Tasks;

namespace AutoServiceManagment.AuthenticationService.Contracts
{
    public interface IAuthService
    {
        public Task<string> GetTokenAsync(CredentialModel credentialModel);
        public Task RegisterAsync(RegisterModel registerViewModel);
        public Task LoginAsync(CredentialModel credentialModel);
        public Task LogoutAsync();


    }
}
