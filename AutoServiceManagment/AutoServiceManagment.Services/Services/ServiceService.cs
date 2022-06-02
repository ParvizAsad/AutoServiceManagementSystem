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
    public class ServiceService : EfCoreRepository<Service>, IServiceService
    {
        private readonly IMapper _mapper;
        private readonly IRepository<Service> _repository;

        public ServiceService(AppDbContext dbContext, IMapper mapper, IRepository<Service> repository) : base(dbContext)
        {
            _mapper = mapper;
            _repository = repository;
        }

        public async Task<IList<ServiceDto>> GetAllServicesAsync()
        {
            var services = await DbContext.Services.Where(x => x.IsDeleted == false).ToListAsync();

            return _mapper.Map<List<ServiceDto>>(services);
        }

        public async Task<ServiceDto> GetServiceAsync(int id)
        {
            var service = await GetAsync(id);

            return _mapper.Map<ServiceDto>(service);
        }

        public async Task AddServiceAsync(ServiceDto serviceDto)
        {
            var existService = await DbContext.Services.Where(x => x.Name == serviceDto.Name).FirstOrDefaultAsync();

            await NullCheck<Service>.Checking(existService);

            var service = _mapper.Map<Service>(serviceDto);
            
            await _repository.AddAsync(service);
        }

        public async Task DeleteServiceAsync(int? id)
        {
            var service = await DbContext.Services.FirstOrDefaultAsync(x => x.Id == id && x.IsDeleted != true);

            if (service == null) { throw new Exception("Service not found!"); }

            service.IsDeleted = true;

            await DbContext.SaveChangesAsync();
        }

        public async Task UpdateServiceAsyncId(int? id, ServiceDto serviceDto)
        {
            var service = await DbContext.Services.FirstOrDefaultAsync(x => x.Id == id && x.IsDeleted != true);
            if (service == null) { throw new Exception("Service not found!"); }

            service.Name = serviceDto.Name;
            service.Detail = serviceDto.Detail;
            service.Price = serviceDto.Price;

            DbContext.Services.Update(service);

            await DbContext.SaveChangesAsync();
        }
    }
}
