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
    public class CustomerProductDto : IDto
    {

        [Required(ErrorMessage = "Product is required!")]
        [ForeignKey(nameof(Product))]
        public int ProductID { get; set; }

        [Required(ErrorMessage = "Customer is required!")]
        [ForeignKey(nameof(Customer))]
        public int CustomerID { get; set; }

        public double Count { get; set; }
        public bool IsDeleted { get; set; } = false;
        public int Id { get; set; }
    }
}
