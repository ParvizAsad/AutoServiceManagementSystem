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
            var products = await GetAllAsync();

            return _mapper.Map<List<ProductDto>>(products);
        }

        public async Task<ProductDto> GetProductAsync(int id)
        {
            var product = await GetAsync(id);

            return _mapper.Map<ProductDto>(product);
        }

        public async Task AddProductAsync(ProductDto productDto)
        {
            var product = _mapper.Map<Product>(productDto);
            await _repository.AddAsync(product);
        }

        public async Task DeleteProductAsync(int? id)
        {
            var product = await _repository.GetAsync(id.Value);

            product.IsDeleted = true;
        }

        public Task UpdateProductAsync(ProductDto productDto)
        {
            throw new System.NotImplementedException();
        }

    }
}
