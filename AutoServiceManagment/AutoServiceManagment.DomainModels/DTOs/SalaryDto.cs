using AutoServiceManagment.Base;
using AutoServiceManagment.DomainModels.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AutoServiceManagment.DomainModels.DTOs
{
    public class SalaryDto : IDto
    {
        public int Id { get; set; }
        public Employee Employee { get; set; }
        public DateTime Date { get; set; } = DateTime.Now;
        public decimal Bonus { get; set; }
        public decimal NetSalary { get; set; }
        public Tax Tax { get; set; }
        public bool IsDeleted { get; set; } = false;
    }
}
