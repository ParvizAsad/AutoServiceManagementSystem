using AutoServiceManagment.Base;
using AutoServiceManagment.DomainModels.Entities;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AutoServiceManagment.DomainModels.DTOs
{
    public class EmployeeDto : IDto
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Fullname is required!")]
        public string FullName { get; set; }
        [Required(ErrorMessage = "Phone number is required!")]
        public string PhoneNumber { get; set; }
        public string OrderNumber { get; set; }
        [Required(ErrorMessage = "Birthdate is required!")]
        public DateTime BirthDate { get; set; }
        [Required(ErrorMessage = "Base Salary is required!")]
        public int BaseSalary { get; set; }
        [Required(ErrorMessage = "Location is required!")]
        public string Location { get; set; }
        public string PersonalDetails { get; set; }
        [Required(ErrorMessage = "Education Level is required!")]
        public string EducationLevel { get; set; }

        [ForeignKey(nameof(Position))]
        public int PositionId { get; set; }

        public string ImageName { get; set; }


    }
}
