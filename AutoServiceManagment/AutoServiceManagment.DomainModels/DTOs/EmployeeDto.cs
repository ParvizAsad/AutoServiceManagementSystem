using AutoServiceManagment.Base;
using AutoServiceManagment.DomainModels.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AutoServiceManagment.DomainModels.DTOs
{
    public class EmployeeDto : IDto
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string PhoneNumber { get; set; }
        public string OrderNumber { get; set; }

        public DateTime BirthDate { get; set; }
        public int BaseSalary { get; set; }
        public string Location { get; set; }
        public string PersonalDetails { get; set; }
        public string EducationLevel { get; set; }

        [ForeignKey(nameof(Position))]
        public int PositionId { get; set; }
      //  public Position Position { get; set; }

    }
}
