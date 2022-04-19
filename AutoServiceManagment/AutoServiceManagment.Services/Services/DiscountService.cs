using AutoMapper;
using AutoServiceManagment.DomainModels.DTOs;
using AutoServiceManagment.DomainModels.Entities;
using AutoServiceManagment.Repository.DataContext;
using AutoServiceManagment.Repository.Repository;
using AutoServiceManagment.Repository.Repository.Contracts;
using AutoServiceManagment.Services.Services.Contracts;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AutoServiceManagment.Services.Services
{
    public class DiscountService : EfCoreRepository<Discount>, IDiscountService
    {
        private readonly IMapper _mapper;
        private readonly IRepository<Discount> _repository;

        public DiscountService(AppDbContext dbContext, IMapper mapper, IRepository<Discount> repository) : base(dbContext)
        {
            _mapper = mapper;
            _repository = repository;
        }

        public async Task<IList<DiscountDto>> GetAllDiscountsAsync()
        {
            var discounts = await GetAllAsync();

            return _mapper.Map<List<DiscountDto>>(discounts);
        }

        public async Task<DiscountDto> GetDiscountAsync(int id)
        {
            var discount = await GetAsync(id);

            return _mapper.Map<DiscountDto>(discount);
        }
        public async Task AddDiscountAsync(DiscountDto discountDto)
        {
            var discount = _mapper.Map<Discount>(discountDto);
         
            await _repository.AddAsync(discount);
        }

        public async Task DeleteDiscountAsync(int? id)
        {
            var discount = await DbContext.Discounts.FirstOrDefaultAsync(x => x.Id == id && x.IsDeleted == true);

            if (discount == null) { throw new Exception("Discount not found!"); }

            discount.IsDeleted = true;

            await DbContext.SaveChangesAsync();
        }

        public async Task UpdateDiscountAsyncId(int? id, DiscountDto discountDto)
        {
            var discount = await DbContext.Discounts.FirstOrDefaultAsync(x => x.Id == id && x.IsDeleted == true);

            if (discount == null) { throw new Exception("Discount not found!"); }

            discount = _mapper.Map<Discount>(discountDto);

            DbContext.Discounts.Update(discount);

            await DbContext.SaveChangesAsync();
        }
    }
}
