using AutoServiceManagment.DomainModels.DTOs;
using AutoServiceManagment.DomainModels.Entities;
using AutoServiceManagment.Repository.Repository.Contracts;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AutoServiceManagment.Services.Services.Contracts
{
    public interface ICashBoxService : IRepository<CashBox>
    {
        Task<IList<CashBoxDto>> GetAllCashBoxsAsync();
    }
}
