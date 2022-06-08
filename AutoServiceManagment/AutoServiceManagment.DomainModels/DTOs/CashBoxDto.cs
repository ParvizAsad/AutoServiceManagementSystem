using AutoServiceManagment.Base;
using System;
using System.ComponentModel.DataAnnotations;

namespace AutoServiceManagment.DomainModels.DTOs
{
    public class CashBoxDto : IDto
    {
        public int Id { get; set; }
        public int ProductID { get; set; }
        public string CustomerName { get; set; }
        public int CustomerID { get; set; }
        public int ServiceID { get; set; }

        [Required(ErrorMessage = "Payment is required!")]
        public double Payment { get; set; }
     
    }
}
