using AutoServiceManagment.Base;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AutoServiceManagment.DomainModels.Entities
{
    public class User : IdentityUser
    {
        [Required(ErrorMessage = "FullName is required!")]
        public string FullName { get; set; }
    }
}
