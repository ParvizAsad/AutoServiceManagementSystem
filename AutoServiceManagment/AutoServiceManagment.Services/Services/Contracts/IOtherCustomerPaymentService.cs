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
    public interface IOtherCustomerPaymentService : IRepository<OtherCustomerPayment>
    {
        Task<IList<OtherCustomerPaymentDto>> GetAllOtherCustomerPaymentDtoAsync();
        Task<OtherCustomerPaymentDto> GetOtherCustomerPaymentAsync(int id);
        Task AddOtherCustomerPaymentAsync(OtherCustomerPaymentDto otherCustomerPaymentDto);
        Task UpdateOtherCustomerPaymentAsyncId(int? id, OtherCustomerPaymentDto otherCustomerPaymentDto);
        Task DeleteOtherCustomerPaymentAsync(int? Id);
    }
}
