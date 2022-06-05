using AutoServiceManagment.Base;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AutoServiceManagment.DomainModels.Entities
{
    public class OtherCustomerPayment : TimestampableObject, IEntity
    {
        public int Id { get; set; }
        public string CustomerName { get; set; } 
        public int ProductID { get; set; }
        public Product Product { get; set; } 

        [Required(ErrorMessage = "Payment is required!")]
        public double Payment { get; set; }

        //public DateTime Date { get; set; } = DateTime.Now;
        public bool IsDeleted { get; set; } = false;
    }
}
