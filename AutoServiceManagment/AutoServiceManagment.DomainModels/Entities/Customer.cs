using AutoServiceManagment.Base;
using System.Collections.Generic;

namespace AutoServiceManagment.DomainModels.Entities
{
    public class Customer : IEntity
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public bool IsNotificationAllowed { get; set; }
        public decimal Debt { get; set; }
        public ICollection<CustomerService> CustomerServices { get; set; }
        public ICollection<CustomerProduct> CustomerProducts { get; set; }
        public bool IsDeleted { get; set; }=false;
    }
}
