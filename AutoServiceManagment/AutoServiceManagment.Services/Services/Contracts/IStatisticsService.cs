using AutoServiceManagment.DomainModels.DTOs;
using AutoServiceManagment.DomainModels.Entities;
using AutoServiceManagment.Repository.Repository.Contracts;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AutoServiceManagment.Services.Services.Contracts
{
    public interface IStatisticsService : IRepository<Statistics>
    {
        Task<IList<StatisticsDto>> GetAllStatisticsAsync();
    }
}
