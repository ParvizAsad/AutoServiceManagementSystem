using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace AutoServiceManagment.DomainModels.Entities
{
    public class User : IdentityUser
    {
        [Required(ErrorMessage = "FullName is required!")]
        public string FullName { get; set; }
    }
}
