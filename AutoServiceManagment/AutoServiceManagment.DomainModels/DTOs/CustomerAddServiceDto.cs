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
    public class CustomerAddServiceDto
    {

        [Required(ErrorMessage = "Service is required!")]
        [ForeignKey(nameof(Service))]
        public int ServiceID { get; set; }

        [Required(ErrorMessage = "Customer is required!")]
        [ForeignKey(nameof(Customer))]
        public int CustomerID { get; set; }

    }
}
