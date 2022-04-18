﻿using AutoMapper;
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
            var finances = await GetAllAsync();

            return _mapper.Map<List<FinanceDto>>(finances);
        }

        public async Task AddFinanceAsync(FinanceDto financeDto)
        {
            var finance = _mapper.Map<Finance>(financeDto);
            await _repository.AddAsync(finance);
        }

        public async Task DeleteFinanceAsync(int? id)
        {
            var finance = await _repository.GetAsync(id.Value);

            finance.IsDeleted = true;
        }

        public Task UpdateFinanceAsync(FinanceDto financeDto)
        {
            throw new System.NotImplementedException();
        }
    }
}