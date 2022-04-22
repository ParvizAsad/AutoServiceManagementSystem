﻿using AutoServiceManagment.Base;
using AutoServiceManagment.DomainModels.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AutoServiceManagment.DomainModels.DTOs
{
    public class ProductDto : IDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal BasePrice { get; set; }
        public decimal SalePrice { get; set; }
        public double Count { get; set; }
        public Category Category { get; set; }
        public Brand Brand { get; set; }
    }
}
