using AutoServiceManagment.Base;
using System.ComponentModel.DataAnnotations;

namespace AutoServiceManagment.DomainModels.DTOs
{
    public class ServiceDto : IDto
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Name is required!")]
        public string Name { get; set; }
        public string Detail { get; set; }
        [Required(ErrorMessage = "Price is required!")]
        public double Price { get; set; }
    }
}
