using AutoServiceManagment.Base;
using System;

namespace AutoServiceManagment.DomainModels.Entities
{
    public class Salary : IEntity
    {
        public int Id { get; set; }
        public int EmployeeID { get; set; }
        public Employee Employee { get; set; }
        public DateTime Date { get; set; }
        public decimal Bonus { get; set; }
        public decimal NetSalary { get; set; }
        public int TaxID { get; set; }
        public bool IsDeleted { get; set; } = false;
    }
}
