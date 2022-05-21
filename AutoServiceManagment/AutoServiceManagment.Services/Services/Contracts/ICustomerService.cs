using AutoServiceManagment.DomainModels.DTOs;
using AutoServiceManagment.DomainModels.Entities;
using AutoServiceManagment.Repository.Repository.Contracts;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AutoServiceManagment.Services.Services.Contracts
{
    public interface ICustomerService : IRepository<Customer>
    {
        Task<IList<CustomerDto>> GetAllCustomersAsync();
        Task<CustomerDto> GetCustomerAsync(int id);
        Task AddCustomerAsync(CustomerDto customerDto);
        Task UpdateCustomerAsyncId(int? id, CustomerDto customerDto);
        Task DeleteCustomerAsync(int? Id);
    }
}
