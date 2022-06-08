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
using System.Linq;
using System.Threading.Tasks;
using AutoServiceManagment.Repository.Data;
using AutoServiceManagment.Infrastructure.Helpers;

namespace AutoServiceManagment.Services.Services
{
    public class DiscountService : EfCoreRepository<Discount>, IDiscountService
    {
        private readonly IMapper _mapper;
        private readonly IRepository<Discount> _repository;
        private readonly IRepository<Customer> _repository1;

        public DiscountService(AppDbContext dbContext, IMapper mapper, IRepository<Discount> repository, IRepository<Customer> repository1) : base(dbContext)
        {
            _mapper = mapper;
            _repository = repository;
            _repository1 = repository1;
        }

        public async Task<IList<DiscountDto>> GetAllDiscountsAsync()
        {
            var existDiscounts = await DbContext.Discounts.Where(x => x.IsDeleted == false).ToListAsync();
            foreach (var discount in existDiscounts)
            {
                if (discount.ExpireDate < DateTime.Today)
                    discount.IsExpired = true;
            }
            var discounts = await DbContext.Discounts.Where(x => x.IsDeleted == false && x.IsExpired==false).ToListAsync();

            return _mapper.Map<List<DiscountDto>>(discounts);
        }

        public async Task<DiscountDto> GetDiscountAsync(int id)
        {
            var discount = await GetAsync(id);

            return _mapper.Map<DiscountDto>(discount);
        }
        public async Task AddDiscountAsync(DiscountDto discountDto)
        {

            var existDiscount= await DbContext.Discounts.Where(x => x.Name == discountDto.Name).FirstOrDefaultAsync();

            await NullCheck<Discount>.Checking(existDiscount);
            var discount = _mapper.Map<Discount>(discountDto);
         
            await _repository.AddAsync(discount);

            var customers = await DbContext.Customers.Where(x => x.IsNotificationAllowed == true && x.IsDeleted == false).ToListAsync();
            foreach (var customer in customers)
            {
                SendEmail.SendEmailForNotify(customer, discount);
            }
        }

        public async Task DeleteDiscountAsync(int? id)
        {
            var discount = await DbContext.Discounts.FirstOrDefaultAsync(x => x.Id == id && x.IsDeleted != true);

            if (discount == null) { throw new Exception("Discount not found!"); }

            discount.IsDeleted = true;

            await DbContext.SaveChangesAsync();
        }

        public async Task UpdateDiscountAsyncId(int? id, DiscountDto discountDto)
        {
            var discount = await DbContext.Discounts.FirstOrDefaultAsync(x => x.Id == id && x.IsDeleted != true);

            if (discount == null) { throw new Exception("Discount not found!"); }

            discount.Name = discountDto.Name;
            discount.Percentage = discountDto.Percentage;
            discount.ExpireDate = discountDto.ExpireDate;

            DbContext.Discounts.Update(discount);

            await DbContext.SaveChangesAsync();
        }
    }
}
