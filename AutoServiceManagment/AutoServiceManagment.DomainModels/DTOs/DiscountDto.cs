using AutoServiceManagment.Base;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AutoServiceManagment.DomainModels.DTOs
{
    public class DiscountDto : IDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ExpireDate { get; set; } = DateTime.Now.ToString("MM/dd/yyyy");
        public decimal Percentage { get; set; }
    }
}
