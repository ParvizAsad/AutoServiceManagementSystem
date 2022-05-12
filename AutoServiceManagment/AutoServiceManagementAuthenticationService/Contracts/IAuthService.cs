using AutoServiceManagment.AuthenticationService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AutoServiceManagment.AuthenticationService.Contracts
{
    public interface IAuthService
    {
        public string GetToken(CredentialModel credentialModel);
    }
}
