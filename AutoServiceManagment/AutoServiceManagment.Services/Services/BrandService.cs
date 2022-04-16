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

        public async Task<BrandDto> GetBrandAsync(int? id)
        {
            if (id == null)
                return null;

            var brand = await GetAsync(id.Value);

            if (brand == null)
                return null;

            return _mapper.Map<BrandDto>(brand);
        }
        public async Task<BrandDto> AddBrandAsync(BrandDto brandDto)
        {
            var brand = _mapper.Map<Brand>(brandDto);

            await _repository.AddAsync(brand);

            return brandDto;
        }

        public async Task<IEnumerable<BrandDto>> AddBrandsAsync(IEnumerable<BrandDto> brandDtos)
        {
            foreach (var brandDto in brandDtos)
            {
                var brand = _mapper.Map<Brand>(brandDto);

                await _repository.AddAsync(brand);
            }
            return brandDtos;
        }

        public async Task<IEnumerable<BrandDto>> AddBrandsAsync(params BrandDto[] brandDtos)
        {
            foreach (var brandDto in brandDtos)
            {
                var brand = _mapper.Map<Brand>(brandDto);

                await _repository.AddAsync(brand);
            }
            return brandDtos;
        }

        public async Task UpdateBrandAsync(BrandDto brandDto)
        {
            var brand = _mapper.Map<Brand>(brandDto);

            await _repository.UpdateAsync(brand);

            return;
        }
        public async Task NullCheck(BrandDto brandDto, int? id)
        {
            if (id == null)
                return;

            var brand = _mapper.Map<Brand>(brandDto);

            if (brand == null)
                return;

            return;
        }
        public async Task DeleteBrandAsync(int? Id)
        {
            if (Id == null)
                return;

            var brand =  _repository.GetAsync(Id.Value);
            if (brand == null)
                return;

            //brand.IsDeleted = true;

            return;
        }
        public async Task DeleteBrandsAsync(IEnumerable<int?> Ids)
        {
            foreach (var Id in Ids)
            {
                if (Id == null)
                    return;

                var brand =await _repository.GetAsync(Id.Value);
                if (brand == null)
                    return;

                //brand.IsDeleted = true;

            }
                return;
        }

        public async Task DeleteBrandsAsync(params int?[] Ids)
        {
            foreach (var Id in Ids)
            {
                if (Id == null)
                    return;

                var brand =await _repository.GetAsync(Id.Value);
                if (brand == null)
                    return;

                //brand.IsDeleted = true;

            }
            return;
        }

        //public Task UpdateBrandsAsync(IEnumerable<BrandDto> brandDtos)
        //{
        //    foreach (var brandDto in brandDtos)
        //    {
        //        if (Id == null)
        //            return;

        //        if (Id != brandDto.Id)
        //            return;

        //        var existBrand = await _repository.GetAsync(Id.Value);
        //        if (existBrand == null)
        //            return;

        //        var brand = _mapper.Map<Brand>(brandDto);

        //        await _repository.UpdateAsync(brand);

        //        return;
        //    }

        //}

        //public Task UpdateBrandsAsync(params BrandDto[] brandDtos)
        //{
        //    foreach (var brandDto in brandDtos)
        //    {

        //    }
        //}
    }
}
