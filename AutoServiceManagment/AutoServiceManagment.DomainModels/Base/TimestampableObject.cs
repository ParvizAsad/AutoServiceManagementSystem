using System;

namespace AutoServiceManagment.Base
{
    public class TimestampableObject : PersistentObject
    {
        public string CreatedBy { get; set; }

        public DateTime CreatedAt { get; set; }

        public string UpdatedBy { get; set; }

        public DateTime UpdatedAt { get; set; }
    }
}
