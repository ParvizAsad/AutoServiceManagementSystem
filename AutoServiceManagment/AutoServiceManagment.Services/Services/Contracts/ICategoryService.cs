﻿using AutoServiceManagment.DomainModels.DTOs;
using AutoServiceManagment.DomainModels.Entities;
using AutoServiceManagment.Repository.Repository.Contracts;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace P320.Services.Services.Contracts
{
    public interface ICategoryService : IRepository<Category>
    {
        Task<IList<CategoryDto>> GetAllCategoriesAsync();
    }
}
