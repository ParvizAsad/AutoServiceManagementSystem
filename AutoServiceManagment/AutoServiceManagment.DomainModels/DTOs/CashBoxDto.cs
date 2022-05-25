using AutoServiceManagment.Base;
using System;
using System.ComponentModel.DataAnnotations;

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
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{mm/dd/yyyy}")]
        public DateTime Date { get; set; } = DateTime.Today;
    }
}
