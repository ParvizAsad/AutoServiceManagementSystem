using AutoMapper;
using AutoServiceManagment.DomainModels.DTOs;
using AutoServiceManagment.DomainModels.Entities;
using AutoServiceManagment.DomainModels.Shared.Result;
using AutoServiceManagment.Repository.DataContext;
using AutoServiceManagment.Repository.Repository;
using AutoServiceManagment.Repository.Repository.Contracts;
using AutoServiceManagment.Services.Services.Contracts;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace AutoServiceManagment.Services.Services
{
    public class BrandService : EfCoreRepository<Brand>, IBrandService
    {
        private readonly IMapper _mapper;
        private readonly IRepository<Brand> _repository;
        private readonly AppDbContext _dbContext;


        public BrandService(AppDbContext dbContext, LocalizationManager translation, IMapper mapper, IRepository<Brand> repository) : base(dbContext, translation)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _repository = repository;
        }

        public async Task<IList<BrandDto>> GetAllBrandsAsync()
        {
            var brands = await _dbContext.Brands.Where(x=>x.IsDeleted==false).ToListAsync();
          //  var brands = await GetAllAsync();

            return _mapper.Map<List<BrandDto>>(brands);
        }

        public async Task AddBrandAsync(BrandDto brandDto)
        {
            var brand = _mapper.Map<Brand>(brandDto);
            await _repository.AddAsync(brand);
        }

        public async Task DeleteBrandAsync(int? id)
        {
            var ad = await _dbContext.Brands.FirstOrDefaultAsync(x => x.Id == id);
          //  if (ad == null) return new ErrorResult(_translation["DataIsNotFound"]);

            ad.IsDeleted = true;
            var deleted = await _dbContext.SaveChangesAsync();
           // return deleted > 0 ? new SuccessResult(_translation["DataIsDeleted"]) : new ErrorResult(_translation["DataIsNotDeleted"]);
        }

        public async Task UpdateBrandAsyncid(int? id, BrandDto brandDto)
        {
            var ad = await _dbContext.Brands.FirstOrDefaultAsync(x => x.Id == id);
            if (ad == null) return new ErrorResult(_translation["DataIsNotFound"]);

            var adType = await _dbContext.Brands.FirstOrDefaultAsync();
           // if (adType is null) return new ErrorResult(_translation["AdTypeNotFound"]);

            var currentAdTypeIsExists = await _dbContext.Brands.Where(x => x.Id != id).FirstOrDefaultAsync();
            // if (currentAdTypeIsExists is not null) return new ErrorResult(_translation["AboutTypeIsAlreadyExists"]);

            //if (request.Photo != null && !request.Photo.IsPhoto()) return new ErrorResult(_translation["PhotoFormatIsNotCorrect"]);

            ad.Name = brandDto.Name;
          
            _dbContext.Brands.Update(ad);

            var updated = await _dbContext.SaveChangesAsync();
        }

        public Task UpdateBrandAsync(BrandDto brandDto)
        {
            throw new System.NotImplementedException();
        }
    }
    
}
