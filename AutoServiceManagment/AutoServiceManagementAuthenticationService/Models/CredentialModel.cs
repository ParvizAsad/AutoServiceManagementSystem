using System.ComponentModel.DataAnnotations;

namespace AutoServiceManagment.AuthenticationService.Models
{
    public class CredentialModel
    {
        
        [Required, DataType(DataType.Password)]
        public string PassWord { get; set; }
        public string Username { get; set; }

        public bool RememberMe { get; set; } = false;

    }
}
