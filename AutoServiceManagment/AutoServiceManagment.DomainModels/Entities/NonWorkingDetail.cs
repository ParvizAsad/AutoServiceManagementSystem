using AutoServiceManagment.Base;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AutoServiceManagment.DomainModels.Entities
{
    public class NonWorkingDetail : TimestampableObject, IEntity
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "StartTIme is required!")]

        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{mm/dd/yyyy}")]
        public DateTime StartTime { get; set; }=DateTime.Now;

        [Required(ErrorMessage = "EndTime is required!")]

        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{mm/dd/yyyy}")]
        public DateTime EndTime { get; set; }= DateTime.Now;
        public int EmployeeId { get; set; }
        public Employee Employee { get; set; }
        public int NonWorkingTypeId { get; set; }
        public NonWorkingType NonWorkingType { get; set; }
        public bool IsDeleted { get; set; } = false;
    }
}
