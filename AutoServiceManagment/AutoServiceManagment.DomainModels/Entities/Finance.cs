using AutoServiceManagment.Base;
using System;
using System.ComponentModel.DataAnnotations;

namespace AutoServiceManagment.DomainModels.Entities
{
    public class Finance : TimestampableObject, IEntity
    {
        public int Id { get; set; }
        public decimal CommunalCost { get; set; }
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{mm/dd/yyyy}")]

        public DateTime Date { get; set; }
        public decimal AdditionalCost { get; set; }
        public bool IsDeleted { get; set; }=false;
    }
}
