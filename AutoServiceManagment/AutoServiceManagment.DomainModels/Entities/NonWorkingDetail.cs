using AutoServiceManagment.Base;
using System;

namespace AutoServiceManagment.DomainModels.Entities
{
    internal class NonWorkingDetail : IEntity
    {
        public int Id { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public int NonWorkingTypeId { get; set; }
        public NonWorkingType NonWorkingType { get; set; }
    }
}
