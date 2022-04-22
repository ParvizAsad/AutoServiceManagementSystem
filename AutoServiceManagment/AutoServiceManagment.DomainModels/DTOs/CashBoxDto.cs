using AutoServiceManagment.Base;
using AutoServiceManagment.DomainModels.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AutoServiceManagment.DomainModels.DTOs
{
    public class CashBoxDto : IDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Payment { get; set; }
        public Product Product { get; set; }
        public Service Service { get; set; }
        public Customer Customer { get; set; }

    }
}
