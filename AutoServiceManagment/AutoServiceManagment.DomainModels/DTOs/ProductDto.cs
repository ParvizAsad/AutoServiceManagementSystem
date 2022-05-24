using AutoServiceManagment.Base;
using AutoServiceManagment.DomainModels.Entities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AutoServiceManagment.DomainModels.DTOs
{
    public class ProductDto : IDto
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Name is required!")]
        public string Name { get; set; }
        [Required(ErrorMessage = "Base price is required!")]
        public decimal BasePrice { get; set; }
        [Required(ErrorMessage = "Sale price is required!")]
        public decimal SalePrice { get; set; }
        public double Count { get; set; }
        [Required(ErrorMessage = "Category is required!")]
        [ForeignKey(nameof(Category))]
        public int CategoryId { get; set; }
        [Required(ErrorMessage = "Brand is required!")]
        [ForeignKey(nameof(Brand))]
        public int BrandId { get; set; }
    }
}
