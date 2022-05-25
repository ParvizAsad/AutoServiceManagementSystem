using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace AutoServiceManagment.Services.Services.Contracts
{
    public interface ITokenService
    {
        //Task<TokenResult> GenerateAuthenticationResultForUser(IdentityUser newUser);
        ClaimsPrincipal GetClaimsPrincipalFromToken(string token);
        bool IsJwtValidSecurityAlgorithm(SecurityToken validatedToken);
    }
}
