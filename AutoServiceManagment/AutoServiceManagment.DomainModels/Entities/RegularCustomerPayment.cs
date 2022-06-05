using AutoServiceManagment.Base;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AutoServiceManagment.DomainModels.Entities
{
    public class RegularCustomerPayment : TimestampableObject, IEntity
    {
        public int Id { get; set; }
        public int CustomerID { get; set; }
        public Customer Customer { get; set; }

        [Required(ErrorMessage = "Payment is required!")]
        public double Payment { get; set; }
        
        public bool IsDeleted { get; set; } = false;
    }
}
