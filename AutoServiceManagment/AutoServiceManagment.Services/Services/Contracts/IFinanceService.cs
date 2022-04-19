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
        // Task AddFinancesAsync(IEnumerable<FinanceDto> financeDtos);
        //  Task AddFinancesAsync(params FinanceDto[] financeDtos);
        Task UpdateFinanceAsyncId(int? id, FinanceDto financeDto);
        // Task UpdateFinancesAsync(IEnumerable<FinanceDto> financeDtos);
        // Task UpdateFinancesAsync(params FinanceDto[] financeDtos);
        Task DeleteFinanceAsync(int? Id);
        // Task DeleteFinancesAsync(IEnumerable<int> Id);
        //  Task DeleteFinancesAsync(params int[] Id);
    }
}
