using AutoServiceManagment.DomainModels.DTOs;
using AutoServiceManagment.DomainModels.Entities;
using AutoServiceManagment.Repository.Repository.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AutoServiceManagment.Services.Services.Contracts
{
    public interface IRegularCustomerPaymentService : IRepository<RegularCustomerPayment>
    {
        Task<IList<RegularCustomerPaymentDto>> GetAllregularCustomerPaymentDtoAsync();
        Task<RegularCustomerPaymentDto> GetRegularCustomerPaymentAsync(int id);
        Task AddRegularCustomerPaymentAsync(RegularCustomerPaymentDto regularCustomerPaymentDto);
        Task UpdateRegularCustomerPaymentAsyncId(int? id, RegularCustomerPaymentDto regularCustomerPaymentDto);
        Task DeleteRegularCustomerPaymentAsync(int? Id);
    }
}
