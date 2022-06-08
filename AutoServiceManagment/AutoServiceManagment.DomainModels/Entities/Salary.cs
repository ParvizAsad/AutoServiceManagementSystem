using AutoServiceManagment.Base;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AutoServiceManagment.DomainModels.Entities
{
    public class Salary : TimestampableObject, IEntity
    {
        public int Id { get; set; }
        [ForeignKey(nameof(Employee))]
        public int EmployeeID { get; set; }
        public Employee Employee { get; set; }
        [Required(ErrorMessage = "Date is required!")]

        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{mm/dd/yyyy}")]
        public DateTime Date { get; set; }= DateTime.Today;
        public double Bonus { get; set; }
        public double OverTime { get; set; }
        public double NetSalary { get; set; } = 0;
        [ForeignKey(nameof(Tax))]
        public int TaxID { get; set; }
        public Tax Tax { get; set; }
        public bool IsDeleted { get; set; } = false;
    }
}