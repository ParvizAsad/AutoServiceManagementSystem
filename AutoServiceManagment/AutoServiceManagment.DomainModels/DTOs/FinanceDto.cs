using AutoServiceManagment.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AutoServiceManagment.DomainModels.DTOs
{
    public class FinanceDto : IDto
    {
        public int Id { get; set; }
        public decimal CommunalCost { get; set; }
        public string Date { get; set; } = DateTime.Now.ToString("MM/dd/yyyy");
        public decimal AdditionalCost { get; set; }
    }
}
