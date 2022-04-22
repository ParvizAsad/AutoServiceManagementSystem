﻿using AutoServiceManagment.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AutoServiceManagment.DomainModels.DTOs
{
    public class TaxDto : IDto
    {
        public int Id { get; set; }
        public decimal IncomeTax { get; set; }
        public decimal SocialTax { get; set; }
    }
}
