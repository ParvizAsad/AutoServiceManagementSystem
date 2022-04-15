using AutoServiceManagment.Base;
using System.Collections.Generic;

namespace AutoServiceManagment.DomainModels.Entities
{
    internal class Service : IEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Detail { get; set; }
        public decimal Price { get; set; }
        public ICollection<CustomerService> CustomerServices { get; set; }
        public bool IsDeleted { get; set; }=false;
    }
}
