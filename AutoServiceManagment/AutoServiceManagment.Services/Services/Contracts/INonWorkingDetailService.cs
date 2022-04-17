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
        // Task<NonWorkingDetailDto> GetNonWorkingDetailAsync(int id);
        Task AddNonWorkingDetailAsync(NonWorkingDetailDto nonWorkingDetailDto);
        // Task AddNonWorkingDetailsAsync(IEnumerable<NonWorkingDetailDto> nonWorkingDetailDtos);
        //  Task AddNonWorkingDetailsAsync(params NonWorkingDetailDto[] nonWorkingDetailDtos);
        Task UpdateNonWorkingDetailAsync(NonWorkingDetailDto nonWorkingDetailDto);
        // Task UpdateNonWorkingDetailsAsync(IEnumerable<NonWorkingDetailDto> nonWorkingDetailDtos);
        // Task UpdateNonWorkingDetailsAsync(params NonWorkingDetailDto[] nonWorkingDetailDtos);
        Task DeleteNonWorkingDetailAsync(int? Id);
        // Task DeleteNonWorkingDetailsAsync(IEnumerable<int> Id);
        //  Task DeleteNonWorkingDetailsAsync(params int[] Id);
    }
}
