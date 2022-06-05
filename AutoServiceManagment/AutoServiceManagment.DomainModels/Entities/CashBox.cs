using AutoServiceManagment.Base;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AutoServiceManagment.DomainModels.Entities
{
    public class CashBox : TimestampableObject, IEntity
    {
        public int Id { get; set; }
        public string CustomerName { get; set; } = null;
        public int ProductID { get; set; } 
        public Product Product { get; set; } = null;

        //[Required(ErrorMessage = "Customer is required!")]
        public int CustomerID { get; set; } 
        public Customer Customer { get; set; } = null;

        public int ServiceID { get; set; }
        public Service Service { get; set; } = null;

        [Required(ErrorMessage = "Payment is required!")]
        public double Payment { get; set; }
       
        //public DateTime Date { get; set; } = DateTime.Now;
        public bool IsDeleted { get; set; }=false;
    }
}
