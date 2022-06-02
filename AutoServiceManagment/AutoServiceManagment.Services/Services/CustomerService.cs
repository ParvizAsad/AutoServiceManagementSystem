using AutoMapper;
using AutoServiceManagment.DomainModels.DTOs;
using AutoServiceManagment.DomainModels.Entities;
using AutoServiceManagment.Infrastructure.Helpers;
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
    public class CustomerService : EfCoreRepository<Customer>, ICustomerService
    {
        private readonly IMapper _mapper;
        private readonly IRepository<Customer> _repository;

        public CustomerService(AppDbContext dbContext, IMapper mapper, IRepository<Customer> repository) : base(dbContext)
        {
            _mapper = mapper;
            _repository = repository;
        }

        public async Task<IList<CustomerDto>> GetAllCustomersAsync()
        {
            var customers = await DbContext.Customers.Where(x => x.IsDeleted == false).Include(x => x.CustomerServices).ThenInclude(x => x.Service).ToListAsync();

            return _mapper.Map<List<CustomerDto>>(customers);
        }

        public async Task<CustomerDto> GetCustomerAsync(int id)
        {
            var customer = await GetAsync(id);

            return _mapper.Map<CustomerDto>(customer);
        }
        public async Task AddCustomerAsync(CustomerDto customerDto)
        {
            var customer = _mapper.Map<Customer>(customerDto);

            var customerServices = new List<CustomerServices>();

            foreach (var id in customerDto.ServiceIds)
            {
                CustomerServices customerService = new CustomerServices
                {
                    ServiceID = id,

                    CustomerID = customer.Id
                };

                customerServices.Add(customerService);
            }

            customer.CustomerServices = customerServices;
            var customerProducts = new List<CustomerProduct>();

            foreach (var id in customerDto.ProductIds)
            {
                var usedProduct = await DbContext.Products.Where(x => x.IsDeleted == false && x.Id==id).FirstOrDefaultAsync();
                usedProduct.Count--;
                CustomerProduct customerProduct = new CustomerProduct
                {
                    ProductID = id,

                    CustomerID = customer.Id,

                };

                customerProducts.Add(customerProduct);
            }

            customer.CustomerProducts = customerProducts;
            await _repository.AddAsync(customer);
        }

        public async Task DeleteCustomerAsync(int? id)
        {
            var customer = await DbContext.Customers.FirstOrDefaultAsync(x => x.Id == id && x.IsDeleted != true);

            await NullCheck<Customer>.Checking(customer);

            customer.IsDeleted = true;

            await DbContext.SaveChangesAsync();
        }

        public async Task UpdateCustomerAsyncId(int? id, CustomerDto customerDto)
        {
            var customer = await DbContext.Customers.FirstOrDefaultAsync(x => x.Id == id && x.IsDeleted != true);

            if (customer == null) { throw new Exception("Customer not found!"); }

            customer.FullName=customerDto.FullName;
            customer.Email = customerDto.Email;
            customer.Debt = customerDto.Debt;
            customer.PhoneNumber = customerDto.PhoneNumber;


            DbContext.Customers.Update(customer);

            await DbContext.SaveChangesAsync();
        }
    }
}
