using AutoMapper;
using AutoServiceManagment.DomainModels.DTOs;
using AutoServiceManagment.DomainModels.Entities;
using AutoServiceManagment.Repository.DataContext;
using AutoServiceManagment.Repository.Repository;
using AutoServiceManagment.Services.Services.Contracts;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AutoServiceManagment.Services.Services
{
    public class CategoryService : EfCoreRepository<Category>, ICategoryService
    {
        private readonly IMapper _mapper;

        public CategoryService(AppDbContext dbContext, IMapper mapper):base(dbContext)
        {
            _mapper = mapper;
        }

        public async Task<IList<CategoryDto>> GetAllCategoriesAsync()
        {
            var categories = await GetAllAsync();

            return _mapper.Map<List<CategoryDto>>(categories);
        }

    }
}
