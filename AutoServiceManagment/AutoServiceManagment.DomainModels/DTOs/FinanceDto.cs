using AutoServiceManagment.Base;
using System;
using System.ComponentModel.DataAnnotations;

namespace AutoServiceManagment.DomainModels.DTOs
{
    public class FinanceDto : IDto
    {
        public int Id { get; set; }
        public double CommunalCost { get; set; }
        [Required(ErrorMessage = "Datetime is required!")]

        public DateTime Date { get; set; }
        public double AdditionalCost { get; set; }
    }
}
