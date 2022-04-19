using AutoServiceManagment.DomainModels.DTOs;
using AutoServiceManagment.DomainModels.Entities;
using AutoServiceManagment.Repository.Repository.Contracts;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AutoServiceManagment.Services.Services.Contracts
{
    public interface ICategoryService : IRepository<Category>
    {
        Task<IList<CategoryDto>> GetAllCategoriesAsync();
        Task<CategoryDto> GetCategoryAsync(int id);
        Task AddCategoryAsync(CategoryDto categoryDto);
        // Task AddCategoriesAsync(IEnumerable<CategoryDto> categoryDtos);
        //  Task AddCategoriesAsync(params CategoryDto[] categoryDtos);
        Task UpdateCategoryAsyncId(int? id, CategoryDto categoryDto);
        // Task UpdateCategoriesAsync(IEnumerable<CategoryDto> categoryDtos);
        // Task UpdateCategoriesAsync(params CategoryDto[] categoryDtos);
        Task DeleteCategoryAsync(int? Id);
        // Task DeleteCategoriesAsync(IEnumerable<int> Id);
        //  Task DeleteCategoriesAsync(params int[] Id);
    }
}
