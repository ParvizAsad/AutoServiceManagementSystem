using AutoServiceManagment.Base;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace AutoServiceManagment.DomainModels.Entities
{
    public class Salary : TimestampableObject, IEntity
    {
        public int Id { get; set; }
        [ForeignKey(nameof(Employee))]
        public int EmployeeID { get; set; }
        public Employee Employee { get; set; }
        public DateTime Date { get; set; }= DateTime.Now;
        public decimal Bonus { get; set; }
        public decimal NetSalary { get; set; }

        [ForeignKey(nameof(Tax))]
        public int TaxID { get; set; }
        public Tax Tax { get; set; }
        public bool IsDeleted { get; set; } = false;
    }
}