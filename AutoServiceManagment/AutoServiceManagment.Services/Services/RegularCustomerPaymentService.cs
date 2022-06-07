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

namespace AutoServiceManagment.Services.Services
{
    public class RegularCustomerPaymentService : EfCoreRepository<RegularCustomerPayment>, IRegularCustomerPaymentService
    {
        private readonly IMapper _mapper;
        private readonly IRepository<RegularCustomerPayment> _repository;

        public RegularCustomerPaymentService(AppDbContext dbContext, IMapper mapper, IRepository<RegularCustomerPayment> repository) : base(dbContext)
        {
            _mapper = mapper;
            _repository = repository;
        }
      
        public async Task<IList<RegularCustomerPaymentDto>> GetAllregularCustomerPaymentDtoAsync()
        {
            var customerPayment = await DbContext.RegularCustomerPayments.Where(x => x.IsDeleted == false).ToListAsync();

            return _mapper.Map<List<RegularCustomerPaymentDto>>(customerPayment);
        }

        public async Task<RegularCustomerPaymentDto> GetRegularCustomerPaymentAsync(int id)
        {
            var customerPayment = await GetAsync(id);

            return _mapper.Map<RegularCustomerPaymentDto>(customerPayment);
        }

        public async Task AddRegularCustomerPaymentAsync(RegularCustomerPaymentDto regularCustomerPaymentDto)
        {
            var customer = await DbContext.Customers.Where(x => x.Id == regularCustomerPaymentDto.CustomerID).FirstOrDefaultAsync();
            if (customer != null)
            {
                customer.Debt += regularCustomerPaymentDto.Payment;
            }
            var regularCustomerPayment = _mapper.Map<RegularCustomerPayment>(regularCustomerPaymentDto);

            await _repository.AddAsync(regularCustomerPayment);
        }

        public async Task DeleteRegularCustomerPaymentAsync(int? Id)
        {
            var regularCustomerPayment = await DbContext.RegularCustomerPayments.FirstOrDefaultAsync(x => x.Id == Id && x.IsDeleted != true);

            if (regularCustomerPayment == null) { throw new Exception("Regular Customer Payment not found!"); }

            regularCustomerPayment.IsDeleted = true;

            await DbContext.SaveChangesAsync();
        }

        public async Task UpdateRegularCustomerPaymentAsyncId(int? id, RegularCustomerPaymentDto regularCustomerPaymentDto)
        {
            var regularCustomerPayment = await DbContext.RegularCustomerPayments.FirstOrDefaultAsync(x => x.Id == id && x.IsDeleted != true);

            if (regularCustomerPayment == null) { throw new Exception("Regular Customer Payment not found!"); }

            regularCustomerPayment.CustomerID = regularCustomerPaymentDto.CustomerID;
            regularCustomerPayment.Payment = regularCustomerPaymentDto.Payment;

            DbContext.RegularCustomerPayments.Update(regularCustomerPayment);

            await DbContext.SaveChangesAsync();
        }
    }
}
