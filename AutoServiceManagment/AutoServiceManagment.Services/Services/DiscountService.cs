using AutoMapper;
using AutoServiceManagment.DomainModels.DTOs;
using AutoServiceManagment.DomainModels.Entities;
using AutoServiceManagment.Repository.DataContext;
using AutoServiceManagment.Repository.Repository;
using AutoServiceManagment.Repository.Repository.Contracts;
using AutoServiceManagment.Services.Services.Contracts;
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

        public async Task AddDiscountAsync(DiscountDto discountDto)
        {
            var discount = _mapper.Map<Discount>(discountDto);
            await _repository.AddAsync(discount);
        }

        public async Task DeleteDiscountAsync(int? id)
        {
            var discount = await _repository.GetAsync(id.Value);

            discount.IsDeleted = true;
        }

        public Task UpdateDiscountAsync(DiscountDto discountDto)
        {
            throw new System.NotImplementedException();
        }

    }
}
