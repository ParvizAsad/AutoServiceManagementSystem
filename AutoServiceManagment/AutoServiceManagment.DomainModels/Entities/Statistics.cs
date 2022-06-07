using AutoServiceManagment.Base;
using System;

namespace AutoServiceManagment.DomainModels.Entities
{
    public class Statistics : TimestampableObject, IEntity
    {
        public int Id { get; set; }
        public double Profit { get; set; }

        public DateTime Date { get; set; } 
    }
}
