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
    public class CustomerAddServiceService : EfCoreRepository<CustomerAddServices>, ICustomerAddServiceService
    {

        private readonly IMapper _mapper;
        private readonly IRepository<CustomerAddServices> _repository;
        private readonly IRepository<Customer> _repositoryCustomer;

        public CustomerAddServiceService(AppDbContext dbContext, IMapper mapper, IRepository<CustomerAddServices> repository, IRepository<Customer> repositoryCustomer) : base(dbContext)
        {
            _mapper = mapper;
            _repository = repository;
            _repositoryCustomer = repositoryCustomer;
        }

        public async Task<IList<CustomerAddServiceDto>> GetAllCustomersAddServiceAsync()
        {
            var customerService = await DbContext.CustomerAddServicess.Where(x => x.IsDeleted == false).ToListAsync();


            return _mapper.Map<List<CustomerAddServiceDto>>(customerService);
        }

        public async Task<CustomerAddServiceDto> GetCustomersAddServiceAsync(int id)
        {
            var customerService = await GetAsync(id);

            return _mapper.Map<CustomerAddServiceDto>(customerService);
        }

        public async Task AddCustomersAddServiceAsync(CustomerAddServiceDto customerServiceDto/*, DiscountDto discountDto*/)
        {
            var discount = await DbContext.Discounts.Where(x => x.Id == customerServiceDto.DiscountID).FirstOrDefaultAsync();
            var customer = await DbContext.Customers.Where(x => x.Id == customerServiceDto.CustomerID).FirstOrDefaultAsync();
            var service = await DbContext.Services.Where(x => x.Id == customerServiceDto.ServiceID).FirstOrDefaultAsync();
           
            if (discount!=null)
            {
            customer.Debt -= (service.Price * (100 - discount.Percentage) / 100);
            }
            else if (discount==null)
            {
                customer.Debt -= service.Price;

            }

            if (customerServiceDto == null) { throw new Exception("Can not be empty"); }

            var customerService = _mapper.Map<CustomerAddServices>(customerServiceDto);

            await _repository.AddAsync(customerService);
        }

        public async Task UpdateCustomersAddServiceAsyncId(int? id, CustomerAddServiceDto customerServiceDto/*, DiscountDto discountDto*/)
        {
            var customerService = await DbContext.CustomerAddServicess.FirstOrDefaultAsync(x => x.Id == id && x.IsDeleted != true);
            if (customerService == null) { throw new Exception("Customer Service not found!"); }
           
            var discount = await DbContext.Discounts.Where(x => x.Id == customerService.DiscountID).FirstOrDefaultAsync();
            var service = await DbContext.Services.FirstOrDefaultAsync(x => x.Id == customerServiceDto.ServiceID);
            var customer = await DbContext.Customers.FirstOrDefaultAsync(x => x.Id == customerServiceDto.CustomerID);
            if (discount != null)
            {
                customer.Debt += (service.Price * (100 - discount.Percentage)) / 100;

            }
            else if (discount == null)
            {
                customer.Debt += service.Price;


            }

            var newDiscount = await DbContext.Discounts.Where(x => x.Id == customerServiceDto.DiscountID).FirstOrDefaultAsync();

            customerService.ServiceID = customerServiceDto.ServiceID;
            customerService.DiscountID = customerServiceDto.DiscountID;
            var newService= await DbContext.Services.FirstOrDefaultAsync(x=> x.Id==customerServiceDto.ServiceID);
            if (discount != null)
            {
                customer.Debt -= (newService.Price * (100 - newDiscount.Percentage)) / 100;

            }
            else if (discount == null)
            {
                customer.Debt -= newService.Price;


            }
            customer.Debt -= (newService.Price * (100 - newDiscount.Percentage)) / 100;

            DbContext.CustomerAddServicess.Update(customerService);

            await DbContext.SaveChangesAsync();
        }

        public async Task DeleteCustomersAddServiceAsync(int? Id)
        {
            var customerService = await DbContext.CustomerAddServicess.FirstOrDefaultAsync(x => x.Id == Id && x.IsDeleted != true);
            if (customerService == null) { throw new Exception("Customer Service not found!"); }
            customerService.IsDeleted = true;

            var discount = await DbContext.Discounts.Where(x => x.Id == customerService.DiscountID).FirstOrDefaultAsync();
            var customer = await DbContext.Customers.FirstOrDefaultAsync(x => x.Id == customerService.CustomerID);
            var service = await DbContext.Services.FirstOrDefaultAsync(x => x.Id == customerService.ServiceID);
            if (discount != null)
            {
                customer.Debt += (service.Price * (100 - discount.Percentage)) / 100;
            }
            else if (discount == null)
            {
                customer.Debt += service.Price;

            }
           

            await DbContext.SaveChangesAsync();
        }
    }
}
