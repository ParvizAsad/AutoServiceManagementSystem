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
        // Task AddTaxsAsync(IEnumerable<TaxDto> TaxDtos);
        //  Task AddTaxsAsync(params TaxDto[] TaxDtos);
        Task UpdateTaxAsync(TaxDto TaxDto);
        // Task UpdateTaxsAsync(IEnumerable<TaxDto> TaxDtos);
        // Task UpdateTaxsAsync(params TaxDto[] TaxDtos);
        Task DeleteTaxAsync(int? Id);
        // Task DeleteTaxsAsync(IEnumerable<int> Id);
        //  Task DeleteTaxsAsync(params int[] Id);
    }
}
