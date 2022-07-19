using AutoServiceManagment.DomainModels.DTOs;
using AutoServiceManagment.DomainModels.Entities;
using AutoServiceManagment.Repository.Repository.Contracts;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AutoServiceManagment.Services.Services.Contracts
{
    public interface ICustomerAddServiceService : IRepository<CustomerAddServices>
    {
        Task<IList<CustomerAddServiceDto>> GetAllCustomersAddServiceAsync();
        Task<CustomerAddServiceDto> GetCustomersAddServiceAsync(int id);
        Task AddCustomersAddServiceAsync(CustomerAddServiceDto customerServiceDto/*, DiscountDto discountDto*/);
        Task UpdateCustomersAddServiceAsyncId(int? id, CustomerAddServiceDto customerServiceDto/*, DiscountDto discountDto*/);
        Task DeleteCustomersAddServiceAsync(int? Id);
    }
}
