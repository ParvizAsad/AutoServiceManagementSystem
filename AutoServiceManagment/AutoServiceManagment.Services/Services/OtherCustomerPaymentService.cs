using AutoServiceManagment.Repository.Repository;
using AutoServiceManagment.Services.Services.Contracts;
using System;
using AutoMapper;
using AutoServiceManagment.DomainModels.DTOs;
using AutoServiceManagment.DomainModels.Entities;
using AutoServiceManagment.Repository.DataContext;
using AutoServiceManagment.Repository.Repository.Contracts;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace AutoServiceManagment.Services.Services
{
    public class OtherCustomerPaymentService : EfCoreRepository<OtherCustomerPayment>, IOtherCustomerPaymentService
    {
        private readonly IMapper _mapper;
        private readonly IRepository<OtherCustomerPayment> _repository;

        public OtherCustomerPaymentService(AppDbContext dbContext, IMapper mapper, IRepository<OtherCustomerPayment> repository) : base(dbContext)
        {
            _mapper = mapper;
            _repository = repository;
        }
        public async Task<IList<OtherCustomerPaymentDto>> GetAllOtherCustomerPaymentDtoAsync()
        {
            var customerPayment = await DbContext.OtherCustomerPayments.Where(x => x.IsDeleted == false).ToListAsync();

            return _mapper.Map<List<OtherCustomerPaymentDto>>(customerPayment);
        }

        public async Task<OtherCustomerPaymentDto> GetOtherCustomerPaymentAsync(int id)
        {
            var customerPayment = await GetAsync(id);

            return _mapper.Map<OtherCustomerPaymentDto>(customerPayment);
        }

        public async Task AddOtherCustomerPaymentAsync(OtherCustomerPaymentDto otherCustomerPaymentDto)
        {
            var products = await DbContext.Products.Where(x => x.Id == otherCustomerPaymentDto.ProductID).FirstOrDefaultAsync();
            if (products.SalePrice < otherCustomerPaymentDto.Payment) { throw new Exception("Not an enough payment");  }
            if (products.Count < otherCustomerPaymentDto.ProductCount) { throw new Exception("Not enough products in stock");  }

            var otherCustomerPayment = _mapper.Map<OtherCustomerPayment>(otherCustomerPaymentDto);
            products.Count -= otherCustomerPaymentDto.ProductCount;
            await _repository.AddAsync(otherCustomerPayment);
        }

        public async Task DeleteOtherCustomerPaymentAsync(int? Id)
        {
            var otherCustomerPayment = await DbContext.OtherCustomerPayments.FirstOrDefaultAsync(x => x.Id == Id && x.IsDeleted != true);

            if (otherCustomerPayment == null) { throw new Exception("CashBox not found!"); }

            otherCustomerPayment.IsDeleted = true;

            await DbContext.SaveChangesAsync();
        }

        public async Task UpdateOtherCustomerPaymentAsyncId(int? id, OtherCustomerPaymentDto otherCustomerPaymentDto)
        {
            var otherCustomerPayment = await DbContext.OtherCustomerPayments.FirstOrDefaultAsync(x => x.Id == id && x.IsDeleted != true);

            if (otherCustomerPayment == null) { throw new Exception("CashBox not found!"); }

            otherCustomerPayment.ProductID = otherCustomerPaymentDto.ProductID;
            otherCustomerPayment.CustomerName = otherCustomerPaymentDto.CustomerName;
            otherCustomerPayment.Payment = otherCustomerPaymentDto.Payment;

            DbContext.OtherCustomerPayments.Update(otherCustomerPayment);

            await DbContext.SaveChangesAsync();
        }
    }
}
