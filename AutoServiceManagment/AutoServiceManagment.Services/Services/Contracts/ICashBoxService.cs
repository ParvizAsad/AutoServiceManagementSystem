using AutoServiceManagment.DomainModels.DTOs;
using AutoServiceManagment.DomainModels.Entities;
using AutoServiceManagment.Repository.Repository.Contracts;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AutoServiceManagment.Services.Services.Contracts
{
    public interface ICashBoxService : IRepository<CashBox>
    {
        Task<IList<CashBoxDto>> GetAllCashBoxesAsync();
        Task<CashBoxDto> GetCashBoxAsync(int id);
        Task AddCashBoxAsync(CashBoxDto cashBoxDto);
        // Task AddCashBoxesAsync(IEnumerable<CashBoxDto> cashBoxDtos);
        //  Task AddCashBoxesAsync(params CashBoxDto[] cashBoxDtos);
        Task UpdateCashBoxAsync(CashBoxDto cashBoxDto);
        // Task UpdateCashBoxesAsync(IEnumerable<CashBoxDto> cashBoxDtos);
        // Task UpdateCashBoxesAsync(params CashBoxDto[] cashBoxDtos);
        Task DeleteCashBoxAsync(int? Id);
        // Task DeleteCashBoxesAsync(IEnumerable<int> Id);
        //  Task DeleteCashBoxesAsync(params int[] Id);
    }
}
