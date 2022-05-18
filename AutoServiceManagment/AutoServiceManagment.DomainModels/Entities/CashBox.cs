﻿using AutoServiceManagment.Base;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AutoServiceManagment.DomainModels.Entities
{
    public class CashBox : TimestampableObject, IEntity
    {
        public int Id { get; set; }

        public int ProductID { get; set; }
        public Product Product { get; set; }

        [Required(ErrorMessage = "Customer is required!")]
        public int CustomerID { get; set; }
        public Customer Customer { get; set; }
        public int ServiceID { get; set; }
        public Service Service { get; set; }

        [Required(ErrorMessage = "Payment is required!")]
        public decimal Payment { get; set; }
        public bool IsDeleted { get; set; }=false;
    }
}
