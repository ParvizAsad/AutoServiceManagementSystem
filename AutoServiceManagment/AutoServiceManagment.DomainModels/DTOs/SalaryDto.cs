using AutoServiceManagment.Base;
using AutoServiceManagment.DomainModels.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AutoServiceManagment.DomainModels.DTOs
{
    public class SalaryDto : IDto
    {
        public int Id { get; set; }
        [ForeignKey(nameof(Employee))]
        public int EmployeeID { get; set; }
        public Employee Employee { get; set; }
        [Required(ErrorMessage = "Date is required!")]
        public DateTime Date { get; set; }
        public decimal Bonus { get; set; }
        public decimal NetSalary { get; set; }
        [ForeignKey(nameof(Tax))]
        public int TaxID { get; set; }
        public Tax Tax { get; set; }
    }
}
