using AutoServiceManagment.Base;

namespace AutoServiceManagment.DomainModels.Entities
{
    internal class CustomerProduct : IEntity
    {
        public int Id { get; set; }
        public int ProductID { get; set; }
        public Product Product { get; set; }
        public int CustomerID { get; set; }
        public Customer Customer { get; set; }
        public double Count { get; set; }
    }
}
