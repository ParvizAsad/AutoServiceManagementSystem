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
            var categories = await DbContext.Categories.Where(x => x.IsDeleted == false).ToListAsync();

            return _mapper.Map<List<CategoryDto>>(categories);
        }

        public async Task<CategoryDto> GetCategoryAsync(int id)
        {
            var category = await GetAsync(id);

            return _mapper.Map<CategoryDto>(category);
        }

        public async Task AddCategoryAsync(CategoryDto categoryDto)
        {
            var categories = await DbContext.Categories.Where(x => x.Name == categoryDto.Name).FirstOrDefaultAsync();
            if (categories != null) { throw new Exception("There is a category with this name!"); }

            var category = _mapper.Map<Category>(categoryDto);
            await _repository.AddAsync(category);
        }

        public async Task DeleteCategoryAsync(int? id)
        {
            var category = await DbContext.Categories.FirstOrDefaultAsync(x => x.Id == id && x.IsDeleted != true);
            if (category == null) { throw new Exception("Category not found!"); }

            category.IsDeleted = true;

            await DbContext.SaveChangesAsync();

        }

        public async Task UpdateCategoryAsyncId(int? id, CategoryDto categoryDto)
        {
            var category = await DbContext.Categories.FirstOrDefaultAsync(x => x.Id == id && x.IsDeleted != true);
            if (category == null) { throw new Exception("Category not found!"); }

            var categorys = await DbContext.Categories.FirstOrDefaultAsync(x => x.Name == categoryDto.Name);
            await NullCheck<Category>.Checking(category);


            category.Name = categoryDto.Name;

            DbContext.Categories.Update(category);

            await DbContext.SaveChangesAsync();
        }
    }
}
