using AutoServiceManagment.Base;
using System.ComponentModel.DataAnnotations.Schema;

namespace AutoServiceManagment.DomainModels.Entities
{
    public class CustomerServices : IEntity
    {
        public int Id { get; set; }
        public int ServiceID { get; set; }
        public Service Service { get; set; }
        public int CustomerID { get; set; }
        public Customer Customer { get; set; }
    }
}
