using AutoServiceManagment.Base;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AutoServiceManagment.DomainModels.DTOs
{
    public class ServiceDto : IDto
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Name is required!")]
        public string Name { get; set; }
        public string Detail { get; set; }
        [Required(ErrorMessage = "Price is required!")]
        public decimal Price { get; set; }
    }
}
