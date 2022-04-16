using AutoMapper;
using AutoServiceManagment.DomainModels.DTOs;
using AutoServiceManagment.DomainModels.Entities;
using AutoServiceManagment.Repository.DataContext;
using AutoServiceManagment.Repository.Repository;
using P320.Services.Services.Contracts;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace P320.Services.Services
{
    public class ProductService : EfCoreRepository<Product>, IProductService
    {
        private readonly IMapper _mapper;

        public ProductService(AppDbContext dbContext, IMapper mapper):base(dbContext)
        {
            _mapper = mapper;
        }

        public async Task<IList<ProductDto>> GetAllProductsAsync()
        {
            var products = await GetAllAsync();

            return _mapper.Map<List<ProductDto>>(products);
        }

    }
}
