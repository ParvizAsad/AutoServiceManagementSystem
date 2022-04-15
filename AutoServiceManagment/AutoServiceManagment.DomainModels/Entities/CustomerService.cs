using AutoServiceManagment.Base;

namespace AutoServiceManagment.DomainModels.Entities
{
    public class CustomerService : IEntity
    {
        public int Id { get; set; }
        public int ServiceID { get; set; }
        public Service Service { get; set; }
        public int CustomerID { get; set; }
        public Customer Customer { get; set; }
    }
}
