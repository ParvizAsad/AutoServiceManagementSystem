using AutoServiceManagment.Base;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace AutoServiceManagment.DomainModels.Entities
{
    public class NonWorkingDetail : TimestampableObject, IEntity
    {
        public int Id { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        [ForeignKey("Employee")]
        public int EmployeeId { get; set; }
        public Employee Employee { get; set; }
        [ForeignKey("NonWorkingType")]
        public int NonWorkingTypeId { get; set; }
        public NonWorkingType NonWorkingType { get; set; }
        public bool IsDeleted { get; set; } = false;
    }
}
