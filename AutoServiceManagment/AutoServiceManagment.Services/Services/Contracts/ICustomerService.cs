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
        // Task AddCustomersAsync(IEnumerable<CustomerDto> CustomerDtos);
        //  Task AddCustomersAsync(params CustomerDto[] CustomerDtos);
        Task UpdateCustomerAsyncId(int? id, CustomerDto customerDto);
        // Task UpdateCustomersAsync(IEnumerable<CustomerDto> CustomerDtos);
        // Task UpdateCustomersAsync(params CustomerDto[] CustomerDtos);
        Task DeleteCustomerAsync(int? Id);
        // Task DeleteCustomersAsync(IEnumerable<int> Id);
        //  Task DeleteCustomersAsync(params int[] Id);
    }
}
