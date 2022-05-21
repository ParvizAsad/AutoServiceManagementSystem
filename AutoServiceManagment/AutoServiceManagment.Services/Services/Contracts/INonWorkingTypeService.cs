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
        Task UpdateNonWorkingTypeAsyncId(int? id, NonWorkingTypeDto nonWorkingTypeDto);
        Task DeleteNonWorkingTypeAsync(int? Id);
    }
}
