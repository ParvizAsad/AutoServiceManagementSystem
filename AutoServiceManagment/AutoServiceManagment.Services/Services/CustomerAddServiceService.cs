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
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AutoServiceManagment.Services.Services
{
    public class CustomerAddServiceService : EfCoreRepository<CustomerAddServices>, ICustomerAddServiceService
    {

        private readonly IMapper _mapper;
        private readonly IRepository<CustomerAddServices> _repository;

        public CustomerAddServiceService(AppDbContext dbContext, IMapper mapper, IRepository<CustomerAddServices> repository) : base(dbContext)
        {
            _mapper = mapper;
            _repository = repository;
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

        public async Task AddCustomersAddServiceAsync(CustomerAddServiceDto customerServiceDto)
        {
            var existCustomerService = await DbContext.CustomerAddServicess.FirstOrDefaultAsync();

            await NullCheck<CustomerAddServices>.Checking(existCustomerService);

            if (customerServiceDto == null) { throw new Exception("Can not be empty"); }

            var customerService = _mapper.Map<CustomerAddServices>(customerServiceDto);

            await _repository.AddAsync(customerService);
        }

        public async Task UpdateCustomersAddServiceAsyncId(int? id, CustomerAddServiceDto customerServiceDto)
        {
            var customerService = await DbContext.CustomerAddServicess.FirstOrDefaultAsync(x => x.Id == id && x.IsDeleted != true);
            if (customerService == null) { throw new Exception("CustomerProduct not found!"); }

            customerService.ServiceID = customerServiceDto.ServiceID;

            DbContext.CustomerAddServicess.Update(customerService);

            await DbContext.SaveChangesAsync();
        }

        public async Task DeleteCustomersAddServiceAsync(int? Id)
        {
            var customerService = await DbContext.CustomerAddServicess.FirstOrDefaultAsync(x => x.Id == Id && x.IsDeleted != true);
            if (customerService == null) { throw new Exception("CustomerProduct not found!"); }
            customerService.IsDeleted = true;

            await DbContext.SaveChangesAsync();
        }
    }
}
