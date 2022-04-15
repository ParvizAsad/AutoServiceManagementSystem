using AutoServiceManagment.Base;
using System.Collections.Generic;

namespace AutoServiceManagment.DomainModels.Entities
{
    public class Product : IEntity
    {
        public int Id { get; set; }
        public decimal BasePrice { get; set; }
        public decimal SalePrice { get; set; }
        public double Count { get; set; }
        public int CategoryID { get; set; }
        public Category Category { get; set; }
        public int BrandID { get; set; }
        public Brand Brand { get; set; }
        public ICollection<CustomerProduct> CustomerProducts { get; set; }
        public bool IsDeleted { get; set; } = false;

    }
}
