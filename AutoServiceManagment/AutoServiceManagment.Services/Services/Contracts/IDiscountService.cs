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
        // Task AddDiscountsAsync(IEnumerable<DiscountDto> DiscountDtos);
        //  Task AddDiscountsAsync(params DiscountDto[] DiscountDtos);
        Task UpdateDiscountAsyncId(int? id, DiscountDto discountDto);
        // Task UpdateDiscountsAsync(IEnumerable<DiscountDto> DiscountDtos);
        // Task UpdateDiscountsAsync(params DiscountDto[] DiscountDtos);
        Task DeleteDiscountAsync(int? Id);
        // Task DeleteDiscountsAsync(IEnumerable<int> Id);
        //  Task DeleteDiscountsAsync(params int[] Id);
    }
}
