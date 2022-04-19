using AutoServiceManagment.DomainModels.DTOs;
using AutoServiceManagment.DomainModels.Entities;
using AutoServiceManagment.Repository.Repository.Contracts;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AutoServiceManagment.Services.Services.Contracts
{
    public interface IProductService : IRepository<Product>
    {
        Task<IList<ProductDto>> GetAllProductsAsync();
        Task<ProductDto> GetProductAsync(int id);
        Task AddProductAsync(ProductDto productDto);
        // Task AddProductsAsync(IEnumerable<ProductDto> productDtos);
        //  Task AddProductsAsync(params ProductDto[] productDtos);
        Task UpdateProductAsyncId(int? id, ProductDto productDto);
        // Task UpdateProductsAsync(IEnumerable<ProductDto> productDtos);
        // Task UpdateProductsAsync(params ProductDto[] productDtos);
        Task DeleteProductAsync(int? Id);
        // Task DeleteProductsAsync(IEnumerable<int> Id);
        //  Task DeleteProductsAsync(params int[] Id);
    }
}
