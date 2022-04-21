using AutoServiceManagment.Base;
using System.ComponentModel.DataAnnotations.Schema;

namespace AutoServiceManagment.DomainModels.Entities
{
    public class CustomerProduct : IEntity
    {
        public int Id { get; set; }
      //  [ForeignKey("Product")]
        public int ProductID { get; set; }
        public Product Product { get; set; }
       // [ForeignKey("Customer")]
        public int CustomerID { get; set; }
        public Customer Customer { get; set; }
        public double Count { get; set; }
    }
}
