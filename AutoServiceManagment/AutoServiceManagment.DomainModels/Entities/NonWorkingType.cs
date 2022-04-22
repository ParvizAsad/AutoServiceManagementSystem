using AutoServiceManagment.Base;
using System.Collections.Generic;

namespace AutoServiceManagment.DomainModels.Entities
{
    public class NonWorkingType : TimestampableObject, IEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsDeleted { get; set; }=false;
        public ICollection<NonWorkingDetail> NonWorkingDetails { get; set; }

    }
}
