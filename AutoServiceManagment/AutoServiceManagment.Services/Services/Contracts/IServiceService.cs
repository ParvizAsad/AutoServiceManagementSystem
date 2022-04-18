using AutoServiceManagment.DomainModels.DTOs;
using AutoServiceManagment.DomainModels.Entities;
using AutoServiceManagment.Repository.Repository.Contracts;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AutoServiceManagment.Services.Services.Contracts
{
    public interface IServiceService : IRepository<Service>
    {
        Task<IList<ServiceDto>> GetAllServicesAsync();
        Task<ServiceDto> GetServiceAsync(int id);
        Task AddServiceAsync(ServiceDto serviceDto);
        // Task AddServicesAsync(IEnumerable<ServiceDto> ServiceDtos);
        //  Task AddServicesAsync(params ServiceDto[] ServiceDtos);
        Task UpdateServiceAsync(ServiceDto serviceDto);
        Task UpdateServiceAsyncId(int? id, ServiceDto serviceDto);
        // Task UpdateServicesAsync(IEnumerable<ServiceDto> ServiceDtos);
        // Task UpdateServicesAsync(params ServiceDto[] ServiceDtos);
        Task DeleteServiceAsync(int? Id);
        // Task DeleteServicesAsync(IEnumerable<int> Id);
        //  Task DeleteServicesAsync(params int[] Id);
    }
}
