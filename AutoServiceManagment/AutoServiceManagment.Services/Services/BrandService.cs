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

            var brands = await DbContext.Brands.Where(x => x.IsDeleted == false).ToListAsync();


            return _mapper.Map<List<BrandDto>>(brands);
        }

        public async Task<BrandDto> GetBrandAsync(int id)
        {
            var brand = await GetAsync(id);

            return _mapper.Map<BrandDto>(brand);
        }

        public async Task AddBrandAsync(BrandDto brandDto)
        {
            var existBrand = await DbContext.Brands.Where(x => x.Name == brandDto.Name).FirstOrDefaultAsync();

            await NullCheck<Brand>.Checking(existBrand);

            if(brandDto==null) { throw new Exception("Can not be empty"); }

            var brand = _mapper.Map<Brand>(brandDto);

            await _repository.AddAsync(brand);
        }

        public async Task DeleteBrandAsync(int? id)
        {
            var brand = await DbContext.Brands.FirstOrDefaultAsync(x => x.Id == id && x.IsDeleted != true);
            if (brand == null) { throw new Exception("Brand not found!"); }

            brand.IsDeleted = true;
            await DbContext.SaveChangesAsync();
        }

        public async Task UpdateBrandAsyncId(int? id, BrandDto brandDto)
        {
            var brand = await DbContext.Brands.FirstOrDefaultAsync(x => x.Id == id && x.IsDeleted != true);
            if (brand == null) { throw new Exception("Brand not found!"); }

            var existBrand = await DbContext.Brands.FirstOrDefaultAsync(x => x.Name == brandDto.Name);
            await NullCheck<Brand>.Checking(existBrand);

            brand.Name = brandDto.Name;

            DbContext.Brands.Update(brand);

            await DbContext.SaveChangesAsync();

        }
    }
}
