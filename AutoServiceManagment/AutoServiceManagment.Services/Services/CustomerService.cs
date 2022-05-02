﻿using AutoMapper;
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
            await _repository.AddAsync(customer);
        }

        public async Task DeleteCustomerAsync(int? id)
        {
            var customer = await DbContext.Customers.FirstOrDefaultAsync(x => x.Id == id && x.IsDeleted == true);

            if (customer == null) { throw new Exception("Customer not found!"); }

            customer.IsDeleted = true;

            await DbContext.SaveChangesAsync();
        }

        public async Task UpdateCustomerAsyncId(int? id, CustomerDto customerDto)
        {
            var customer = await DbContext.Customers.FirstOrDefaultAsync(x => x.Id == id && x.IsDeleted == true);

            if (customer == null) { throw new Exception("Customer not found!"); }

            customer = _mapper.Map<Customer>(customerDto);

            DbContext.Customers.Update(customer);

            await DbContext.SaveChangesAsync();
        }
    }
}
