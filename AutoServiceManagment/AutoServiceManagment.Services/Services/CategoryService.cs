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
    public class CategoryService : EfCoreRepository<Category>, ICategoryService
    {
        private readonly IMapper _mapper;
        private readonly IRepository<Category> _repository;

        public CategoryService(AppDbContext dbContext, IMapper mapper, IRepository<Category> repository) : base(dbContext)
        {
            _mapper = mapper;
            _repository = repository;
        }

        public async Task<IList<CategoryDto>> GetAllCategoriesAsync()
        {
            var categories = await GetAllAsync();

            return _mapper.Map<List<CategoryDto>>(categories);
        }

        public async Task<CategoryDto> GetCategoryAsync(int id)
        {
            var category = await GetAsync(id);

            return _mapper.Map<CategoryDto>(category);
        }

        public async Task AddCategoryAsync(CategoryDto categoryDto)
        {
            var category = _mapper.Map<Category>(categoryDto);
            await _repository.AddAsync(category);
        }

        public async Task DeleteCategoryAsync(int? id)
        {
            var category = await _repository.GetAsync(id.Value);

            category.IsDeleted = true;

        }

        public Task UpdateCategoryAsync(CategoryDto categoryDto)
        {
            throw new System.NotImplementedException();
        }

    }
}
