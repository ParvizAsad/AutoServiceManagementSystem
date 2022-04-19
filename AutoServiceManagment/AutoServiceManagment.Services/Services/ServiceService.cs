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
            var services = await GetAllAsync();

            return _mapper.Map<List<ServiceDto>>(services);
        }

        public async Task<ServiceDto> GetServiceAsync(int id)
        {
            var service = await GetAsync(id);

            return _mapper.Map<ServiceDto>(service);
        }

        public async Task AddServiceAsync(ServiceDto serviceDto)
        {
            var service = _mapper.Map<Service>(serviceDto);
            await _repository.AddAsync(service);
        }

        public async Task DeleteServiceAsync(int? id)
        {
            var service = await DbContext.Services.FirstOrDefaultAsync(x => x.Id == id && x.IsDeleted == true);

            if (service == null) { throw new Exception("Service not found!"); }

            service.IsDeleted = true;

            await DbContext.SaveChangesAsync();
        }

        public async Task UpdateServiceAsyncId(int? id, ServiceDto serviceDto)
        {
            var service = await DbContext.Services.FirstOrDefaultAsync(x => x.Id == id && x.IsDeleted == true);

            if (service == null) { throw new Exception("Service not found!"); }

            service = _mapper.Map<Service>(serviceDto);

            DbContext.Services.Update(service);

            await DbContext.SaveChangesAsync();
        }
    }
}
