using AutoServiceManagment.Base;
using System;

namespace AutoServiceManagment.DomainModels.Entities
{
    public class CustomerAddServices : IEntity
    {
        public int Id { get; set; }
        public int ServiceID { get; set; }
        public Service Service { get; set; }
        public int CustomerID { get; set; }
        public Customer Customer { get; set; }

        public DateTime date=DateTime.Today;
        public bool IsDeleted { get; set; } = false;
    }
}
