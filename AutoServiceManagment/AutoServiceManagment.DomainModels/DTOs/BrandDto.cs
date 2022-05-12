using AutoServiceManagment.Base;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AutoServiceManagment.DomainModels.DTOs
{
    public class BrandDto : IDto
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Brand name is required!")]
        public string Name { get; set; }
    }
}
