using AutoServiceManagment.Base;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AutoServiceManagment.DomainModels.DTOs
{
    public class CustomerDto : IDto
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Fullname is required!")]
        public string FullName { get; set; }

        [Required(ErrorMessage = "Phonenumber is required!")]
        public string PhoneNumber { get; set; }
       
        [Required(ErrorMessage = "Email is required!")]
        public string Email { get; set; }
       
        public double Debt { get; set; }
       
        public bool IsNotificationAllowed { get; set; } = true;

    }
}
