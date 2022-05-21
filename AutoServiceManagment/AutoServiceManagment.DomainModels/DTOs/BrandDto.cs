using AutoServiceManagment.Base;
using System.ComponentModel.DataAnnotations;

namespace AutoServiceManagment.DomainModels.DTOs
{
    public class BrandDto : IDto
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Brand name is required!")]
        public string Name { get; set; }
    }
}
