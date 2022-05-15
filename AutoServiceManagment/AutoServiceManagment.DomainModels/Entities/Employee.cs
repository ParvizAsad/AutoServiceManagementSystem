using AutoServiceManagment.Base;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AutoServiceManagment.DomainModels.Entities
{
    public class Employee : TimestampableObject, IEntity
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Fullname is required!")]
        public string FullName { get; set; }
        [Required(ErrorMessage = "Birthdate is required!")]
        public DateTime BirthDate { get; set; }
        [Required(ErrorMessage = "Base Salary is required!")]
        public int BaseSalary { get; set; }
        [Required(ErrorMessage = "Location is required!")]
        public string Location { get; set; }
        [Required(ErrorMessage = "Phone number is required!")]
        public string PhoneNumber { get; set; }
        public string OrderNumber { get; set; }
        [ForeignKey(nameof(Position))]
        public int PositionId { get; set; }
        public Position Position { get; set; }
        public string PersonalDetails { get; set; }
        [Required(ErrorMessage = "Education Level is required!")]
        public string EducationLevel { get; set; }
        public ICollection<NonWorkingDetail> NonWorkingDetails { get; set; }
        public ICollection<Salary> Salaries { get; set; }
        public bool IsDeleted { get; set; } = false;

        public string ImageName { get; set; }

        [NotMapped]
        public IFormFile ImageFile { get; set; }

    }
}
