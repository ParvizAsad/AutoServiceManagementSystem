using AutoServiceManagment.Base;

namespace AutoServiceManagment.DomainModels.Entities
{
    public class Bio : IEntity
    {
        public int Id { get; set; }
        public string Logo { get; set; }
    }
}
