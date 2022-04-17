using AutoMapper;
using AutoServiceManagment.DomainModels.DTOs;
using AutoServiceManagment.DomainModels.Entities;
using AutoServiceManagment.Repository.DataContext;
using AutoServiceManagment.Repository.Repository;
using AutoServiceManagment.Repository.Repository.Contracts;
using AutoServiceManagment.Services.Services.Contracts;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AutoServiceManagment.Services.Services
{
    public class CashBoxService : EfCoreRepository<CashBox>, ICashBoxService
    {
        private readonly IMapper _mapper;
        private readonly IRepository<CashBox> _repository;

        public CashBoxService(AppDbContext dbContext, IMapper mapper, IRepository<CashBox> repository) : base(dbContext)
        {
            _mapper = mapper;
            _repository = repository;
        }

        public async Task<IList<CashBoxDto>> GetAllCashBoxesAsync()
        {
            var cashBoxes = await GetAllAsync();

            return _mapper.Map<List<CashBoxDto>>(cashBoxes);
        }

        public async Task<CashBoxDto> GetCashBoxAsync(int id)
        {
            var cashBox = await GetAsync(id);

            return _mapper.Map<CashBoxDto>(cashBox);
        }

        public async Task AddCashBoxAsync(CashBoxDto cashBoxDto)
        {
            var cashBox = _mapper.Map<CashBox>(cashBoxDto);
            await _repository.AddAsync(cashBox);
        }

        public async Task DeleteCashBoxAsync(int? id)
        {
            var cashBox = await _repository.GetAsync(id.Value);

            cashBox.IsDeleted = true;

        }

        public Task UpdateCashBoxAsync(CashBoxDto cashBoxDto)
        {
            throw new System.NotImplementedException();
        }

    }
}
