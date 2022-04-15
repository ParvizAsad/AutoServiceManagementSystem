﻿using AutoServiceManagment.Base;

namespace AutoServiceManagment.DomainModels.Entities
{
    public class CashBox : IEntity
    {
        public int Id { get; set; }
        public int ProductID { get; set; }
        public Product Product { get; set; }
        public int CustomerID { get; set; }
        public Customer Customer { get; set; }
        public int ServiceID { get; set; }
        public Service Service { get; set; }
        public decimal Payment { get; set; }
        public bool IsDeleted { get; set; }=false;
    }
}