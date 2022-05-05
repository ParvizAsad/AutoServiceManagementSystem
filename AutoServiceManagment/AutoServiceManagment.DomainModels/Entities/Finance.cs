using AutoServiceManagment.Base;
using System;

namespace AutoServiceManagment.DomainModels.Entities
{
    public class Finance : TimestampableObject, IEntity
    {
        public int Id { get; set; }
        public decimal CommunalCost { get; set; }
        public string Date { get; set; } = DateTime.Now.ToString("MM/dd/yyyy");
        public decimal AdditionalCost { get; set; }
        public bool IsDeleted { get; set; }=false;
    }
}
