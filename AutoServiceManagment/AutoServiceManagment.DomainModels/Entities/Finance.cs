using AutoServiceManagment.Base;
using System;

namespace AutoServiceManagment.DomainModels.Entities
{
    public class Finance : IEntity
    {
        public int Id { get; set; }
        public decimal CommunalCost { get; set; }
        public DateTime Date { get; set; }
        public decimal AdditionalCost { get; set; }
        public bool IsDeleted { get; set; }=false;
    }
}
