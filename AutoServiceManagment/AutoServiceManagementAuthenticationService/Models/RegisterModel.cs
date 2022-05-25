using System.ComponentModel.DataAnnotations;

namespace AutoServiceManagment.AuthenticationService.Models
{
    public class RegisterModel
    {
        [Required]
        public string FullName { get; set; }

        [Required]
        public string Username { get; set; }

        [Required, EmailAddress, DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        [Required, DataType(DataType.Password)]
        public string PassWord { get; set; }

        [Required, DataType(DataType.Password), Compare(nameof(PassWord))]
        public string ConfirmPassWord { get; set; }
    }
}
