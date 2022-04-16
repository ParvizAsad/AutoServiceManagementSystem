using AutoMapper;
using AutoServiceManagment.DomainModels.DTOs;
using AutoServiceManagment.DomainModels.Entities;
using AutoServiceManagment.Repository.DataContext;
using AutoServiceManagment.Repository.Repository;
using P320.Services.Services.Contracts;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace P320.Services.Services
{
    public class CashBoxService : EfCoreRepository<CashBox>, ICashBoxService
    {
        private readonly IMapper _mapper;

        public CashBoxService(AppDbContext dbContext, IMapper mapper):base(dbContext)
        {
            _mapper = mapper;
        }

        public async Task<IList<CashBoxDto>> GetAllCashBoxsAsync()
        {
            var cashBoxes = await GetAllAsync();

            return _mapper.Map<List<CashBoxDto>>(cashBoxes);
        }

    }
}
