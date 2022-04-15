using AutoServiceManagment.Base;

namespace AutoServiceManagment.DomainModels.Entities
{
    internal class Position : IEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsDeleted { get; set; } = false;

    }
}
