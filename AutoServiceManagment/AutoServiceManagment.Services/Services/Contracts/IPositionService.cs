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
        // Task AddPositionsAsync(IEnumerable<PositionDto> positionDtos);
        //  Task AddPositionsAsync(params PositionDto[] positionDtos);
        Task UpdatePositionAsync(PositionDto positionDto);
        Task UpdatePositionAsyncId(int? id, PositionDto positionDto);
        // Task UpdatePositionsAsync(IEnumerable<PositionDto> positionDtos);
        // Task UpdatePositionsAsync(params PositionDto[] positionDtos);
        Task DeletePositionAsync(int? Id);
        // Task DeletePositionsAsync(IEnumerable<int> Id);
        //  Task DeletePositionsAsync(params int[] Id);
    }
}
