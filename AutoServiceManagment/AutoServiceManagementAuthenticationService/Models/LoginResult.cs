using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AutoServiceManagment.AuthenticationService.Models
{
    public class LoginResult
    {
        public string UserId { get; set; }
        public Task<string> AuthToken { get; set; }
    }
}
