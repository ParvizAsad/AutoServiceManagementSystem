using AutoServiceManagment.Base;
using System;
using System.ComponentModel.DataAnnotations;

namespace AutoServiceManagment.DomainModels.DTOs
{
    public class NonWorkingDetailDto : IDto
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "StartTIme is required!")]

        [DataType(DataType.Date)]
        //[DisplayFormat(DataFormatString = "{mm/dd/yyyy}")]
        public DateTime StartTime { get; set; }

        [Required(ErrorMessage = "EndTime is required!")]
        [DataType(DataType.Date)]
        //[DisplayFormat(DataFormatString = "{mm/dd/yyyy}")]
        public DateTime EndTime { get; set; }
        public int EmployeeId { get; set; }
        public int NonWorkingTypeId { get; set; }
    }
}
