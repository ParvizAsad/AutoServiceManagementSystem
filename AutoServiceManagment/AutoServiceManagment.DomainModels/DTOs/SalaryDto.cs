using AutoServiceManagment.Base;
using AutoServiceManagment.DomainModels.Entities;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AutoServiceManagment.DomainModels.DTOs
{
    public class SalaryDto : IDto
    {
        public int Id { get; set; }
        [ForeignKey(nameof(Employee))]
        public int EmployeeID { get; set; }
        //public Employee Employee { get; set; }
        [Required(ErrorMessage = "Date is required!")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{mm/dd/yyyy}")]
        public DateTime Date { get; set; }
        public double NetSalary { get; set; } = 0;
        public double Bonus { get; set; }
        public double Overtime { get; set; }
        [ForeignKey(nameof(Tax))]
        public int TaxID { get; set; }
        //public Tax Tax { get; set; }
    }
}
