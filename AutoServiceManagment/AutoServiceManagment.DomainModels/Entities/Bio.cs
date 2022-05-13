using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AutoServiceManagment.DomainModels.Entities
{
    public class Bio
    {
        public int Id { get; set; }
        [Required]
        public string Logo { get; set; }
    }
}
