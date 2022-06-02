using AutoServiceManagment.Base;
using System.ComponentModel.DataAnnotations.Schema;

namespace AutoServiceManagment.DomainModels.Entities
{
    public class CustomerProduct : TimestampableObject, IEntity
    {
        public int Id { get; set; }
        public int ProductID { get; set; }
        public Product Product { get; set; }
        public int CustomerID { get; set; }
        public Customer Customer { get; set; }
        public double Count { get; set; }
        public bool IsDeleted { get; set; }=false;
    }
}
