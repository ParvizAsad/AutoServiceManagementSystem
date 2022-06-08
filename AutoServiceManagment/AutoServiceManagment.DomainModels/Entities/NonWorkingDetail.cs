using AutoServiceManagment.Base;
using System;
using System.ComponentModel.DataAnnotations;

namespace AutoServiceManagment.DomainModels.Entities
{
    public class NonWorkingDetail : TimestampableObject, IEntity
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "StartTIme is required!")]
        [DataType(DataType.Date)]
        public DateTime StartTime { get; set; }=DateTime.Today;

        [Required(ErrorMessage = "EndTime is required!")]
        [DataType(DataType.Date)]
        public DateTime EndTime { get; set; }= DateTime.Today.AddDays(1);
        public int EmployeeId { get; set; }
        public Employee Employee { get; set; }
        public int NonWorkingTypeId { get; set; }
        public NonWorkingType NonWorkingType { get; set; }
        public bool IsDeleted { get; set; } = false;
    }
}
