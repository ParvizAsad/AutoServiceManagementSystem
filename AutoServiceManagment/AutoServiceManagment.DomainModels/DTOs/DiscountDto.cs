using AutoServiceManagment.Base;
using System;
using System.ComponentModel.DataAnnotations;

namespace AutoServiceManagment.DomainModels.DTOs
{
    public class DiscountDto : IDto
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Discount name is required!")]
        public string Name { get; set; }
        [Required(ErrorMessage = "Expire date is required!")]
        public DateTime ExpireDate { get; set; } = DateTime.Today;
        [Required(ErrorMessage = "Percentage is required!")]
        public double Percentage { get; set; }

    }
}
