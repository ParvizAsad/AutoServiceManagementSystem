using AutoServiceManagment.Base;
using System;
using System.ComponentModel.DataAnnotations;

namespace AutoServiceManagment.DomainModels.Entities
{
    public class Finance : TimestampableObject, IEntity
    {
        public int Id { get; set; }
        public double CommunalCost { get; set; }
        public double AdditionalCost { get; set; }
        [Required(ErrorMessage = "Datetime is required!")]
        public DateTime Date { get; set; }
        public bool IsDeleted { get; set; }=false;
    }
}
