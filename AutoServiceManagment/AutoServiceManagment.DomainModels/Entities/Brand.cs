using AutoServiceManagment.Base;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AutoServiceManagment.DomainModels.Entities
{
    public class Brand : TimestampableObject, IEntity
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Brand name is required!")]
        public string Name { get; set; }
        public bool IsDeleted { get; set; }=false;
        public ICollection<Product> Product { get; set; }

    }
}
