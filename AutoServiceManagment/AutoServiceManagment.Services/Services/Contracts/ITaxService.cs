using AutoServiceManagment.DomainModels.DTOs;
using AutoServiceManagment.DomainModels.Entities;
using AutoServiceManagment.Repository.Repository.Contracts;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AutoTaxManagment.Service.Services.Contracts
{
    public interface ITaxService : IRepository<Tax>
    {
        Task<IList<TaxDto>> GetAllTaxesAsync();
        Task<TaxDto> GetTaxAsync(int id);
        Task AddTaxAsync(TaxDto TaxDto);
        Task UpdateTaxAsyncId(int? id, TaxDto taxDto);
        Task DeleteTaxAsync(int? Id);
    }
}
