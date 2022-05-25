using AutoServiceManagment.Base;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AutoServiceManagment.DomainModels.Entities
{
    public class User : IdentityUser
    {
        [Required]
        public string FullName { get; set; }
        public bool IsDeleted { get; set; } = false;
        public bool IsSubscribe { get; set; } = false;
    }
}
