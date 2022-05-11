using AutoServiceManagment.AuthenticationService.Contracts;
using AutoServiceManagment.AuthenticationService.Models;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AutoServiceManagment.AuthenticationService
{
    internal class AuthService : IAuthService
    {
        private readonly JwtSetting _jwtSetting;

        public AuthService(IOptions<JwtSetting> jwtSetting)
        {
            _jwtSetting = jwtSetting;
        }

        public string GetToken(CredentialModel credentialModel)
        {
            throw new NotImplementedException();
        }
    }
}
}
