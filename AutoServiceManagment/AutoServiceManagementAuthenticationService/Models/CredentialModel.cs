using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AutoServiceManagment.AuthenticationService.Models
{
    public class CredentialModel
    {
        [Required]
        public string Username { get; set; }

        [Required, DataType(DataType.Password)]

        public string Password { get; set; }
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
        public bool RememberMe { get; set; }

    }
}
