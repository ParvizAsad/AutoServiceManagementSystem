using AutoServiceManagment.Base;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AutoServiceManagment.DomainModels.Entities
{
    public class Service : TimestampableObject, IEntity
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Name is required!")]
        public string Name { get; set; }
        public string Detail { get; set; }
        [Required(ErrorMessage = "Price is required!")]
        public double Price { get; set; }
        public ICollection<CustomerAddServices> CustomerServices { get; set; }
        public ICollection<CashBox> CashBoxes { get; set; }
        public bool IsDeleted { get; set; }=false;
    }
}
