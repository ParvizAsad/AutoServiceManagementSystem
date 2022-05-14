using AutoServiceManagment.AuthenticationService.Models;
using AutoServiceManagment.DomainModels.Entities;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AutoServiceManagment.AuthenticationService.Contracts
{
    public interface IAuthService
    {
        public Task<string> GetTokenAsync(CredentialModel credentialModel);
        //public Task RegisterAsync(RegisterModel registerViewModel);
        //public Task LoginAsync(CredentialModel credentialModel);

    }
}
