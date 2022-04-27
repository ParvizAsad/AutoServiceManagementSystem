using AutoServiceManagment.Base;
using System;
using System.Collections.Generic;

namespace AutoServiceManagment.DomainModels.Entities
{
    public class Tax : TimestampableObject, IEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal TaxValue { get; set; }
        public decimal SocialTax { get; set; }
        public ICollection<Salary> Salaries { get; set; }
        public bool IsDeleted { get; set; } = false;
    }
}
