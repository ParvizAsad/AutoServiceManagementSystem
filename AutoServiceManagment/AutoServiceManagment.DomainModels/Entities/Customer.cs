using AutoServiceManagment.Base;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AutoServiceManagment.DomainModels.Entities
{
    public class Customer : TimestampableObject, IEntity
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Fullname is required!")]
        public string FullName { get; set; }
        [Required(ErrorMessage = "Phonenumber is required!")]
        public string PhoneNumber { get; set; }
        [Required(ErrorMessage = "Email is required!")]
        public string Email { get; set; }
        public bool IsNotificationAllowed { get; set; }
        public decimal Debt { get; set; }
        public ICollection<CustomerServices> CustomerServices { get; set; }
        public ICollection<CustomerProduct> CustomerProducts { get; set; }
        public ICollection<CashBox> CashBoxes { get; set; }
        public bool IsDeleted { get; set; }=false;
        [NotMapped]
        public List<int> ServiceIds { get; set; }
        [NotMapped]
        public List<int> ProductIds { get; set; }
    }
}
