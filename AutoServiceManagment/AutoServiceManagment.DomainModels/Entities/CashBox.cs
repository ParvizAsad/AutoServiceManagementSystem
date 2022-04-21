using AutoServiceManagment.Base;
using System.ComponentModel.DataAnnotations.Schema;

namespace AutoServiceManagment.DomainModels.Entities
{
    public class CashBox : TimestampableObject, IEntity
    {
        public int Id { get; set; }
       // [ForeignKey("Product")]
        public int ProductID { get; set; }
        public Product Product { get; set; }
    //    [ForeignKey("Customer")]
        public int CustomerID { get; set; }
        public Customer Customer { get; set; }
       // [ForeignKey("Service")]
        public int ServiceID { get; set; }
        public Service Service { get; set; }
        public decimal Payment { get; set; }
        public bool IsDeleted { get; set; }=false;
    }
}
