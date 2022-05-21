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
        Task UpdateBrandAsyncId(int? id,BrandDto brandDto);
        Task DeleteBrandAsync(int? Id);
    }
}
