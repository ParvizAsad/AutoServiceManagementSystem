using AutoServiceManagment.DomainModels.DTOs;
using AutoServiceManagment.DomainModels.Entities;
using AutoServiceManagment.Repository.Repository.Contracts;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AutoServiceManagment.Services.Services.Contracts
{
    public interface IFinanceService : IRepository<Finance>
    {
        Task<IList<FinanceDto>> GetAllFinancesAsync();
        Task<FinanceDto> GetFinanceAsync(int id);
        Task AddFinanceAsync(FinanceDto financeDto);
        Task UpdateFinanceAsyncId(int? id, FinanceDto financeDto);
        Task DeleteFinanceAsync(int? Id);
    }
}
