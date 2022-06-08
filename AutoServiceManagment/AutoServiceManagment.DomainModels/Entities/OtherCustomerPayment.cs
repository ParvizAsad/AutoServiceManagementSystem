using AutoServiceManagment.Base;
using System.ComponentModel.DataAnnotations;

namespace AutoServiceManagment.DomainModels.Entities
{
    public class OtherCustomerPayment : TimestampableObject, IEntity
    {
        public int Id { get; set; }
        public string CustomerName { get; set; } 
        public int ProductID { get; set; }
        public Product Product { get; set; }
        public int ProductCount { get; set; }
        [Required(ErrorMessage = "Payment is required!")]
        public double Payment { get; set; }
        public bool IsDeleted { get; set; } = false;
    }
}
