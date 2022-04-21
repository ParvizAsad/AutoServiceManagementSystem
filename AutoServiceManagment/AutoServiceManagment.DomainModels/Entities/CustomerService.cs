using AutoServiceManagment.Base;
using System.ComponentModel.DataAnnotations.Schema;

namespace AutoServiceManagment.DomainModels.Entities
{
    public class CustomerService : IEntity
    {
        public int Id { get; set; }
      //  [ForeignKey("Service")]
        public int ServiceID { get; set; }
        public Service Service { get; set; }
     //   [ForeignKey("Customer")]
        public int CustomerID { get; set; }
        public Customer Customer { get; set; }
    }
}
