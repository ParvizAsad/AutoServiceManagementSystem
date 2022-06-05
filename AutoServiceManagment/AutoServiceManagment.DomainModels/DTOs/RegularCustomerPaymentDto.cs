using AutoServiceManagment.Base;
using AutoServiceManagment.DomainModels.Entities;
using System.ComponentModel.DataAnnotations;

namespace AutoServiceManagment.DomainModels.DTOs
{
    public class RegularCustomerPaymentDto : IDto
    {
        public int Id { get; set; }
        public int CustomerID { get; set; }

        [Required(ErrorMessage = "Payment is required!")]
        public double Payment { get; set; }
    }
}
