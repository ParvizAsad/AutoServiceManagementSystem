using System;

namespace AutoServiceManagment.Base
{
    public class TimestampableObject : PersistentObject
    {
        public string CreatedBy { get; set; }=string.Empty;

        public DateTime CreatedAt { get; set; }=DateTime.Now;

        public string UpdatedBy { get; set; }=string.Empty;

        public DateTime UpdatedAt { get; set; }= DateTime.Now;
    }
}
