using AutoServiceManagment.Base;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AutoServiceManagment.DomainModels.Entities
{
    public class Statistics : TimestampableObject, IEntity
    {
        public int Id { get; set; }
        public decimal Profit { get; set; } 
        public DateTime Date { get; set; } 
    }
}
