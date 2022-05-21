using AutoServiceManagment.DomainModels.DTOs;
using AutoServiceManagment.DomainModels.Entities;
using AutoServiceManagment.Repository.Repository.Contracts;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AutoServiceManagment.Services.Services.Contracts
{
    public interface INonWorkingDetailService : IRepository<NonWorkingDetail>
    {
        Task<IList<NonWorkingDetailDto>> GetAllNonWorkingDetailsAsync();
        Task<NonWorkingDetailDto> GetNonWorkingDetailAsync(int id);
        Task AddNonWorkingDetailAsync(NonWorkingDetailDto nonWorkingDetailDto);
        Task UpdateNonWorkingDetailAsyncId(int? id, NonWorkingDetailDto nonWorkingDetailDto);
        Task DeleteNonWorkingDetailAsync(int? Id);
    }
}
