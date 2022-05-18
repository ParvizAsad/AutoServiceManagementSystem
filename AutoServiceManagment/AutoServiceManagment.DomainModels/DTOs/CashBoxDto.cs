using AutoServiceManagment.Base;
using AutoServiceManagment.DomainModels.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AutoServiceManagment.DomainModels.DTOs
{
    public class CashBoxDto : IDto
    {
        public int Id { get; set; }
        public int ProductID { get; set; }

        [Required(ErrorMessage = "Customer is required!")]
        public int CustomerID { get; set; }
        public int ServiceID { get; set; }

        [Required(ErrorMessage = "Payment is required!")]
        public decimal Payment { get; set; }
    }
}
