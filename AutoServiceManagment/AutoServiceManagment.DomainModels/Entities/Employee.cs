using AutoServiceManagment.Base;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace AutoServiceManagment.DomainModels.Entities
{
    public class Employee : TimestampableObject, IEntity
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public DateTime BirthDate { get; set; }
        public int BaseSalary { get; set; }
        public string Location { get; set; }
        public string PhoneNumber { get; set; }
        public string OrderNumber { get; set; }
        public int PositionId { get; set; }
        public Position Position { get; set; }
        public string PersonalDetails { get; set; }
        public string EducationLevel { get; set; }
        public NonWorkingDetail NonWorkingDetail { get; set; }
        public bool IsDeleted { get; set; } = false;
    }
}
