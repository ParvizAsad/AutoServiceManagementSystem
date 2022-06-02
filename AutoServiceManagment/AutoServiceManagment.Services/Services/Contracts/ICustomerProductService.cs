using AutoServiceManagment.DomainModels.DTOs;
using AutoServiceManagment.DomainModels.Entities;
using AutoServiceManagment.Repository.Repository.Contracts;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AutoServiceManagment.Services.Services.Contracts
{
    public interface ICustomerProductService : IRepository<CustomerProduct>
    {
        Task<IList<CustomerProductDto>> GetAllCustomersProductAsync();
        Task<CustomerProductDto> GetCustomersProductAsync(int id);
        Task AddCustomerProductAsync(CustomerProductDto customerProductDto);
        Task UpdateCustomersProductAsyncId(int? id, CustomerProductDto customerProductDto);
        Task DeleteCustomerProductAsync(int? Id);
    }
}
