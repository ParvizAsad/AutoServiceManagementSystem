using AutoServiceManagment.Base;
using System;
using System.ComponentModel.DataAnnotations;

namespace AutoServiceManagment.DomainModels.DTOs
{
    public class StatisticsDto : IDto
    {
        public int Id { get; set; }
        public double Profit { get; set; }

        public DateTime Date { get; set; }
     }
}
