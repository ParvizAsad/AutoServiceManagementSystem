using AutoServiceManagment.Base;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace AutoServiceManagment.DomainModels.Entities
{
    public class Product : TimestampableObject, IEntity
    {
        public int Id { get; set; }
        public decimal BasePrice { get; set; }
        public decimal SalePrice { get; set; }
        public double Count { get; set; }
        [ForeignKey("Category")]
        public int CategoryID { get; set; }
        public Category Category { get; set; }
        [ForeignKey("Brand")]
        public int BrandID { get; set; }
        public Brand Brand { get; set; }
        public ICollection<CustomerProduct> CustomerProducts { get; set; }
        public bool IsDeleted { get; set; } = false;

    }
}
