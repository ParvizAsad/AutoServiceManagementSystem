using AutoServiceManagment.Base;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AutoServiceManagment.DomainModels.DTOs
{
    public class OtherCustomerPaymentDto : IDto
    {
        public int Id { get; set; }
        public string CustomerName { get; set; }
        public int ProductID { get; set; }
        public int ProductCount { get; set; }

        [Required(ErrorMessage = "Payment is required!")]
        public double Payment { get; set; }
    }
}
