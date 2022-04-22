using AutoServiceManagment.Base;
using System.Collections.Generic;

namespace AutoServiceManagment.DomainModels.Entities
{
    public class Service : TimestampableObject, IEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Detail { get; set; }
        public decimal Price { get; set; }
        public ICollection<CustomerService> CustomerServices { get; set; }
        public ICollection<CashBox> CashBoxes { get; set; }
        public bool IsDeleted { get; set; }=false;
    }
}
