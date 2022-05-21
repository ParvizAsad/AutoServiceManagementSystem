using AutoServiceManagment.DomainModels.DTOs;
using AutoServiceManagment.DomainModels.Entities;
using AutoServiceManagment.Repository.Repository.Contracts;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AutoServiceManagment.Services.Services.Contracts
{
    public interface IPositionService : IRepository<Position>
    {
        Task<IList<PositionDto>> GetAllPositionsAsync();
        Task<PositionDto> GetPositionAsync(int id);
        Task AddPositionAsync(PositionDto positionDto);
        Task UpdatePositionAsyncId(int? id, PositionDto positionDto);
        Task DeletePositionAsync(int? Id);
    }
}
