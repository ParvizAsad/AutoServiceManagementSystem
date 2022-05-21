using AutoMapper;
using AutoServiceManagment.DomainModels.DTOs;
using AutoServiceManagment.DomainModels.Entities;
using AutoServiceManagment.Repository.DataContext;
using AutoServiceManagment.Repository.Repository;
using AutoServiceManagment.Repository.Repository.Contracts;
using AutoServiceManagment.Services.Services.Contracts;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AutoServiceManagment.Services.Services
{
    public class BioService : EfCoreRepository<Bio>, IBioService
    {
        private readonly IMapper _mapper;
        private readonly IRepository<Bio> _repository;

        public BioService(AppDbContext dbContext, IMapper mapper, IRepository<Bio> repository) : base(dbContext)
        {
            _mapper = mapper;
            _repository = repository;
        }
        public async Task<IList<BioDto>> GetAllBiosAsync()
        {

            var bios = await DbContext.Bios.ToListAsync();

            return _mapper.Map<List<BioDto>>(bios);
        }
    }
}
