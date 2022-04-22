using AutoServiceManagment.Base;
using System;
using System.Collections.Generic;

namespace AutoServiceManagment.DomainModels.Entities
{
    public class Tax : TimestampableObject, IEntity
    {
        public int Id { get; set; }
        public decimal IncomeTax { get; set; }
        public decimal SocialTax { get; set; }
        public ICollection<Tax> Taxs { get; set; }

        public bool IsDeleted { get; set; } = false;
    }
}
