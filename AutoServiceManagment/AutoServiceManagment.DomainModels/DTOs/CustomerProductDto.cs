using AutoServiceManagment.Base;
using AutoServiceManagment.DomainModels.Entities;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace AutoServiceManagment.DomainModels.DTOs
{
    public class CustomerProductDto : IDto
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Product is required!")]
        [ForeignKey(nameof(Product))]
        public int ProductID { get; set; }

        [Required(ErrorMessage = "Customer is required!")]
        [ForeignKey(nameof(Customer))]
        public int CustomerID { get; set; }
        public double Count { get; set; }
     
    }
}
