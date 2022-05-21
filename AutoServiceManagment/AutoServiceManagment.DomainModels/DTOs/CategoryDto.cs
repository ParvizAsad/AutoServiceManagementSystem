using AutoServiceManagment.Base;
using System.ComponentModel.DataAnnotations;

namespace AutoServiceManagment.DomainModels.DTOs
{
    public class CategoryDto : IDto
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Category name is required!")]
        public string Name { get; set; }
    }
}
