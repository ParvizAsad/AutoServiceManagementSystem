using AutoServiceManagment.DomainModels.DTOs;
using AutoServiceManagment.DomainModels.Entities;
using AutoServiceManagment.Repository.Repository.Contracts;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AutoServiceManagment.Services.Services.Contracts
{
    public interface INonWorkingTypeService : IRepository<NonWorkingType>
    {
        Task<IList<NonWorkingTypeDto>> GetAllNonWorkingTypesAsync();
        Task<NonWorkingTypeDto> GetNonWorkingTypeAsync(int id);
        Task AddNonWorkingTypeAsync(NonWorkingTypeDto nonWorkingTypeDto);
        // Task AddNonWorkingTypesAsync(IEnumerable<NonWorkingTypeDto> nonWorkingTypeDtos);
        //  Task AddNonWorkingTypesAsync(params NonWorkingTypeDto[] nonWorkingTypeDtos);
        Task UpdateNonWorkingTypeAsyncId(int? id, NonWorkingTypeDto nonWorkingTypeDto);
        // Task UpdateNonWorkingTypesAsync(IEnumerable<NonWorkingTypeDto> nonWorkingTypeDtos);
        // Task UpdateNonWorkingTypesAsync(params NonWorkingTypeDto[] nonWorkingTypeDtos);
        Task DeleteNonWorkingTypeAsync(int? Id);
        // Task DeleteNonWorkingTypesAsync(IEnumerable<int> Id);
        //  Task DeleteNonWorkingTypesAsync(params int[] Id);
    }
}
