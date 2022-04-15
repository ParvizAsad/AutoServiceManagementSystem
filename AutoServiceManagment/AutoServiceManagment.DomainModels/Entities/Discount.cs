using AutoServiceManagment.Base;
using System;

namespace AutoServiceManagment.DomainModels.Entities
{
    public class Discount : IEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime ExpireDate { get; set; }
        public decimal Percentage { get; set; }
        public bool IsDeleted { get; set; } = false;

    }
}
