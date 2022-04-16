using AutoServiceManagment.DomainModels.DTOs;
using AutoServiceManagment.DomainModels.Entities;
using AutoServiceManagment.Repository.Repository.Contracts;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AutoServiceManagment.Services.Services.Contracts
{
    public interface IBrandService : IRepository<Brand>
    {
        Task<IList<BrandDto>> GetAllBrandsAsync();
        Task<BrandDto> GetBrandAsync(int id);
        Task AddBrandAsync(BrandDto brandDto);
        Task AddBrandsAsync(IEnumerable<BrandDto> brandDtos);
        Task AddBrandsAsync(params BrandDto[] brandDtos);
        Task UpdateBrandAsync(BrandDto brandDto);
        Task UpdateBrandsAsync(IEnumerable<BrandDto> brandDto);
        Task UpdateBrandsAsync(params BrandDto[] brandDto);
        Task DeleteBrandAsync(int Id);
        Task DeleteBrandsAsync(IEnumerable<int> Id);
        Task DeleteBrandsAsync(params int[] Id);
    }
}
