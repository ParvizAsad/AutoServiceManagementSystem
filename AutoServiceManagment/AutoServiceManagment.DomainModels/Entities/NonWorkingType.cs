using AutoServiceManagment.Base;

namespace AutoServiceManagment.DomainModels.Entities
{
    public class NonWorkingType : IEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsDeleted { get; set; }=false;

    }
}
