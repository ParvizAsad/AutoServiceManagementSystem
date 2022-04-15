using AutoServiceManagment.DomainModels.DTOs;
using AutoServiceManagment.DomainModels.Entities;
using AutoServiceManagment.Repository.Repository.Contracts;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace P320.Services.Services.Contracts
{
    public interface IProductService : IRepository<Product>
    {
        object GetTest();

        Task<IList<ProductDto>> GetAllProductsAsync();
    }
}
