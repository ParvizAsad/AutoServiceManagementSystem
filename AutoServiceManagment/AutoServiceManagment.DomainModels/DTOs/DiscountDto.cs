using AutoServiceManagment.Base;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AutoServiceManagment.DomainModels.DTOs
{
    public class DiscountDto : IDto
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Discount name is required!")]
        public string Name { get; set; }
        [Required(ErrorMessage = "Expire date is required!")]
        public DateTime ExpireDate { get; set; } = DateTime.Now;
        [Required(ErrorMessage = "Percentage is required!")]
        public decimal Percentage { get; set; }

    }
}
