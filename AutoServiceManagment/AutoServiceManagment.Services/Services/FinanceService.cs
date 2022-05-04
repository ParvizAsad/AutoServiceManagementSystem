using AutoMapper;
using AutoServiceManagment.DomainModels.DTOs;
using AutoServiceManagment.DomainModels.Entities;
using AutoServiceManagment.Repository.DataContext;
using AutoServiceManagment.Repository.Repository;
using AutoServiceManagment.Repository.Repository.Contracts;
using AutoServiceManagment.Services.Services.Contracts;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AutoServiceManagment.Services.Services
{
    public class FinanceService : EfCoreRepository<Finance>, IFinanceService
    {
        private readonly IMapper _mapper;
        private readonly IRepository<Finance> _repository;

        public FinanceService(AppDbContext dbContext, IMapper mapper, IRepository<Finance> repository) : base(dbContext)
        {
            _mapper = mapper;
            _repository = repository;
        }

        public async Task<IList<FinanceDto>> GetAllFinancesAsync()
        {

            var finances = await DbContext.Finances.Where(x => x.IsDeleted == false).ToListAsync();

            return _mapper.Map<List<FinanceDto>>(finances);
        }

        public async Task<FinanceDto> GetFinanceAsync(int id)
        {
            var finance = await GetAsync(id);

            return _mapper.Map<FinanceDto>(finance);
        }

        public async Task AddFinanceAsync(FinanceDto financeDto)
        {
            var finance = _mapper.Map<Finance>(financeDto);

            await _repository.AddAsync(finance);
        }

        public async Task DeleteFinanceAsync(int? id)
        {
            var finance = await DbContext.Finances.FirstOrDefaultAsync(x => x.Id == id && x.IsDeleted != true);

            if (finance == null) { throw new Exception("Finance not found!"); }

            finance.IsDeleted = true;

            await DbContext.SaveChangesAsync();
        }

        public async Task UpdateFinanceAsyncId(int? id, FinanceDto financeDto)
        {
            var finance = await DbContext.Finances.FirstOrDefaultAsync(x => x.Id == id && x.IsDeleted != true);

            if (finance == null) { throw new Exception("Finance not found!"); }

            finance.AdditionalCost = financeDto.AdditionalCost;
            finance.CommunalCost = financeDto.CommunalCost;
            finance.Date = financeDto.Date;


            DbContext.Finances.Update(finance);

            await DbContext.SaveChangesAsync();
        }
    }
}
