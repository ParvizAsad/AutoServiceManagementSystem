using AutoMapper;
using AutoServiceManagment.DomainModels.DTOs;
using AutoServiceManagment.DomainModels.Entities;
using AutoServiceManagment.Infrastructure.Helpers;
using AutoServiceManagment.Repository.DataContext;
using AutoServiceManagment.Repository.Repository;
using AutoServiceManagment.Repository.Repository.Contracts;
using AutoServiceManagment.Services.Services.Contracts;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AutoServiceManagment.Services.Services
{
    public class CustomerProductService : EfCoreRepository<CustomerProduct>, ICustomerProductService
    {
        private readonly IMapper _mapper;
        private readonly IRepository<CustomerProduct> _repository;

        public CustomerProductService(AppDbContext dbContext, IMapper mapper, IRepository<CustomerProduct> repository) : base(dbContext)
        {
            _mapper = mapper;
            _repository = repository;
        }

        public async Task<IList<CustomerProductDto>> GetAllCustomersProductAsync()
        {
            var customerProducts = await DbContext.CustomerProducts.Where(x => x.IsDeleted == false).ToListAsync();

            return _mapper.Map<List<CustomerProductDto>>(customerProducts);
        }

        public async Task<CustomerProductDto> GetCustomersProductAsync(int id)
        {
            var customerProducts = await GetAsync(id);

            return _mapper.Map<CustomerProductDto>(customerProducts);
        }

        public async Task AddCustomerProductAsync(CustomerProductDto customerProductDto)
        {
            var existCustomerProduct = await DbContext.CustomerProducts.FirstOrDefaultAsync();

            await NullCheck<CustomerProduct>.Checking(existCustomerProduct);

            if (customerProductDto == null) { throw new Exception("Can not be empty"); }

            var customerProduct = _mapper.Map<CustomerProduct>(customerProductDto);

            await _repository.AddAsync(customerProduct);
        }

        public async Task DeleteCustomerProductAsync(int? Id)
        {
            var customerProduct = await DbContext.CustomerProducts.FirstOrDefaultAsync(x => x.Id == Id && x.IsDeleted==false);
            if (customerProduct == null) { throw new Exception("Brand not found!"); }

            customerProduct.IsDeleted = true;
            await DbContext.SaveChangesAsync();
        }
       
        public async Task UpdateCustomersProductAsyncId(int? id, CustomerProductDto customerProductDto)
        {
            var customerProduct = await DbContext.CustomerProducts.FirstOrDefaultAsync(x => x.Id == id && x.IsDeleted != true);
            if (customerProduct == null) { throw new Exception("CustomerProduct not found!"); }

            customerProduct.Count = customerProductDto.Count;

            DbContext.CustomerProducts.Update(customerProduct);

            await DbContext.SaveChangesAsync();
        }

    }
}
