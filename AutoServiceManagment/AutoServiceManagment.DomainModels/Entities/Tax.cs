using AutoServiceManagment.Base;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AutoServiceManagment.DomainModels.Entities
{
    public class Tax : TimestampableObject, IEntity
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Name is required!")]
        public string Name { get; set; }
        [Required(ErrorMessage = "TaxValue is required!")]
        public double TaxValue { get; set; }
        public ICollection<Salary> Salaries { get; set; }
        public bool IsDeleted { get; set; } = false;
    }
}
