using AutoServiceManagment.DomainModels.DTOs;
using AutoServiceManagment.DomainModels.Entities;
using AutoServiceManagment.Repository.Repository.Contracts;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AutoServiceManagment.Services.Services.Contracts
{
    public interface IDiscountService : IRepository<Discount>
    {
        Task<IList<DiscountDto>> GetAllDiscountsAsync();
        Task<DiscountDto> GetDiscountAsync(int id);
        Task AddDiscountAsync(DiscountDto discountDto);
        Task UpdateDiscountAsyncId(int? id, DiscountDto discountDto);
        Task DeleteDiscountAsync(int? Id);
    }
}
