using AutoServiceManagment.Base;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AutoServiceManagment.DomainModels.Entities
{
    public class NonWorkingType : TimestampableObject, IEntity
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Name is required!")]
        public string Name { get; set; }
        public bool IsDeleted { get; set; }=false;
        public ICollection<NonWorkingDetail> NonWorkingDetails { get; set; }

    }
}
