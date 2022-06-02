using AutoServiceManagment.Base;
using System.ComponentModel.DataAnnotations;

namespace AutoServiceManagment.DomainModels.DTOs
{
    public class TaxDto : IDto
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Name is required!")]
        public string Name { get; set; }
        [Required(ErrorMessage = "TaxValue is required!")]
        public double TaxValue { get; set; }
    }
}
