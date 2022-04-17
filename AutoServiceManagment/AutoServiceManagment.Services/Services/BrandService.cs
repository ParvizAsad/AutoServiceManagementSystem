using AutoMapper;
using AutoServiceManagment.DomainModels.DTOs;
using AutoServiceManagment.DomainModels.Entities;
using AutoServiceManagment.Repository.DataContext;
using AutoServiceManagment.Repository.Repository;
using AutoServiceManagment.Repository.Repository.Contracts;
using AutoServiceManagment.Services.Services.Contracts;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AutoServiceManagment.Services.Services
{
    public class BrandService : EfCoreRepository<Brand>, IBrandService
    {
        private readonly IMapper _mapper;
        private readonly IRepository<Brand> _repository;

        public BrandService(AppDbContext dbContext, IMapper mapper, IRepository<Brand> repository) : base(dbContext)
        {
            _mapper = mapper;
            _repository = repository;
        }

         public async Task<IList<BrandDto>> GetAllBrandsAsync()
        {
            var brands = await GetAllAsync();

            return _mapper.Map<List<BrandDto>>(brands);
        }

        public async Task AddBrandAsync(BrandDto brandDto)
        {
            var brands = await _repository.AddAsync(BrandDto brandDto);
        }

        public Task DeleteBrandAsync(int Id)
        {
            throw new System.NotImplementedException();
        }

        public Task UpdateBrandAsync(BrandDto brandDto)
        {
            throw new System.NotImplementedException();
        }

    }
}
