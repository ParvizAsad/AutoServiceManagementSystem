using AutoServiceManagment.Base;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AutoServiceManagment.DomainModels.Entities
{
    public class Product : TimestampableObject, IEntity
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Name is required!")]
        public string Name { get; set; }
        [Required(ErrorMessage = "Base price is required!")]
        public double BasePrice { get; set; }
        [Required(ErrorMessage = "Sale price is required!")]
        public double SalePrice { get; set; }
        public double Count { get; set; }
        public string Detail { get; set; }
        [Required]
        [ForeignKey(nameof(Category))]
        public int CategoryID { get; set; }
        public Category Category { get; set; }
        [Required(ErrorMessage = "Brand is required!")]
        [ForeignKey(nameof(Brand))]
        public int BrandID { get; set; }
        public Brand Brand { get; set; }
        public ICollection<CustomerProduct> CustomerProducts { get; set; }
        public ICollection<CashBox> CashBoxes { get; set; }
        public ICollection<OtherCustomerPayment> OtherCustomerPayments { get; set; }
        public bool IsDeleted { get; set; } = false;
    }
}
