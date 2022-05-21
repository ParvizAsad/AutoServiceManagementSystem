using System.ComponentModel.DataAnnotations;

namespace AutoServiceManagment.AuthenticationService.Models
{
    public class ResetPasswordModel
    {
        [Required]
        public string Username { get; set; }

        [Required, MaxLength(255), DataType(DataType.Password)]
        public string oldPassword { get; set; }
        
        [Required, MaxLength(255), DataType(DataType.Password)]
        public string newPassword { get; set; }

        [Required, MaxLength(255), DataType(DataType.Password), Compare(nameof(newPassword))]
        public string ConfirmNewPassword { get; set; }
    }
}
