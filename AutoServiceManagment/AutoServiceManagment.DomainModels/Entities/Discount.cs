using AutoServiceManagment.Base;
using System;
using System.ComponentModel.DataAnnotations;

namespace AutoServiceManagment.DomainModels.Entities
{
    public class Discount : TimestampableObject, IEntity
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Discount name is required!")]
        public string Name { get; set; }
        [Required(ErrorMessage = "Expire date is required!")]
        public DateTime ExpireDate { get; set; } = DateTime.Today;
        [Required(ErrorMessage = "Percentage is required!")]
        public double Percentage { get; set; }
        public bool IsExpired { get; set; } = false;
        public bool IsDeleted { get; set; } = false;

    }
}
