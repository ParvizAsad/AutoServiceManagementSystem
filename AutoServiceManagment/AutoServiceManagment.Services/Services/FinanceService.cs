using AutoMapper;
using AutoServiceManagment.DomainModels.DTOs;
using AutoServiceManagment.DomainModels.Entities;
using AutoServiceManagment.Repository.DataContext;
using AutoServiceManagment.Repository.Repository;
using AutoServiceManagment.Services.Services.Contracts;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AutoServiceManagment.Services.Services
{
    public class FinanceService : EfCoreRepository<Finance>, IFinanceService
    {
        private readonly IMapper _mapper;

        public FinanceService(AppDbContext dbContext, IMapper mapper):base(dbContext)
        {
            _mapper = mapper;
        }

        public async Task<IList<FinanceDto>> GetAllFinancesAsync()
        {
            var finances = await GetAllAsync();

            return _mapper.Map<List<FinanceDto>>(finances);
        }
    }
}
