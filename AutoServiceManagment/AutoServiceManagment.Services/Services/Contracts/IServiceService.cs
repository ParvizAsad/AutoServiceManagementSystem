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
        Task UpdateServiceAsyncId(int? id, ServiceDto serviceDto);
        Task DeleteServiceAsync(int? Id);
    }
}
