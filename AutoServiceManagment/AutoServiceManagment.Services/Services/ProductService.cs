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
    public class ProductService : EfCoreRepository<Product>, IProductService
    {
        private readonly IMapper _mapper;
        private readonly IRepository<Product> _repository;

        public ProductService(AppDbContext dbContext, IMapper mapper, IRepository<Product> repository) : base(dbContext)
        {
            _mapper = mapper;
            _repository = repository;
        }

        public async Task<IList<ProductDto>> GetAllProductsAsync()
        {
            var products = await DbContext.Products.Where(x => x.IsDeleted == false).ToListAsync();

            return _mapper.Map<List<ProductDto>>(products);
        }

        public async Task<ProductDto> GetProductAsync(int id)
        {
            var product = await GetAsync(id);

            return _mapper.Map<ProductDto>(product);
        }

        public async Task AddProductAsync(ProductDto productDto)
        {
            var existProduct = await DbContext.Products.Where(x => x.Name == productDto.Name).FirstOrDefaultAsync();

            await NullCheck<Product>.Checking(existProduct);

            var product = _mapper.Map<Product>(productDto);

            await _repository.AddAsync(product);
        }

        public async Task DeleteProductAsync(int? id)
        {
            var product = await DbContext.Products.FirstOrDefaultAsync(x => x.Id == id && x.IsDeleted != true);

            if (product == null) { throw new Exception("Product not found!"); }

            product.IsDeleted = true;

            await DbContext.SaveChangesAsync();
        }

        public async Task UpdateProductAsyncId(int? id, ProductDto productDto)
        {
            var product = await DbContext.Products.FirstOrDefaultAsync(x => x.Id == id && x.IsDeleted != true);

            if (product == null) { throw new Exception("Product not found!"); }

            product.Name=productDto.Name;   
            product.Detail=productDto.Detail;   
            product.Count=productDto.Count;   
            product.BasePrice=productDto.BasePrice;   
            product.SalePrice=productDto.SalePrice;   
            product.BrandID=productDto.BrandId; 
            product.CategoryID=productDto.CategoryId;  
          

            DbContext.Products.Update(product);

            await DbContext.SaveChangesAsync();
        }
    }
}
