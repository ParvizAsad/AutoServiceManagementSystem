using AutoServiceManagment.DomainModels.DTOs;
using AutoServiceManagment.DomainModels.Entities;
using AutoServiceManagment.Repository.Repository.Contracts;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AutoServiceManagment.Services.Services.Contracts
{
    public interface ISalaryService : IRepository<Salary>
    {
        Task<IList<SalaryDto>> GetAllSalarysAsync();
        Task<SalaryDto> GetSalaryAsync(int id);
        Task AddSalaryAsync(SalaryDto salaryDto);
        Task UpdateSalaryAsyncId(int? id, SalaryDto salaryDto);
        Task DeleteSalaryAsync(int? Id);
    }
}
