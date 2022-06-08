using AutoServiceManagment.Base;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

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
        public DateTime date = DateTime.Today;
        public bool IsDeleted { get; set; }=false;
    }
}
