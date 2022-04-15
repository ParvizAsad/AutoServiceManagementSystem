using AutoServiceManagment.Base;
using System;

namespace AutoServiceManagment.DomainModels.Entities
{
    public class Tax : IEntity
    {
        public int Id { get; set; }
        public decimal IncomeTax { get; set; }
        public decimal SocialTax { get; set; }
        public bool IsDeleted { get; set; } = false;
    }
}
