using AutoServiceManagment.Base;
using System;
using System.ComponentModel.DataAnnotations;

namespace AutoServiceManagment.DomainModels.Entities
{
    public class Discount : TimestampableObject, IEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ExpireDate { get; set; } = DateTime.Now.ToString("MM/dd/yyyy");
        public decimal Percentage { get; set; }
        public bool IsDeleted { get; set; } = false;

    }
}
