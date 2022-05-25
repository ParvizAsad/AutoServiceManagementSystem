using System.ComponentModel.DataAnnotations;

namespace AutoServiceManagment.AuthenticationService.Models
{
    public class CredentialModel

    {
        [Required]
        public string Email { get; set; }

        [Required, DataType(DataType.Password)]

        public string Password { get; set; }

        public bool RememberMe { get; set; } = false;

    }
}
