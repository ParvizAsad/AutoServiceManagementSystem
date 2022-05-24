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
    public class StatisticsService : EfCoreRepository<Statistics>, IStatisticsService
    {
        private readonly IMapper _mapper;
        private readonly IRepository<Statistics> _repository;
        private readonly IRepository<Finance> _repository1;
        private readonly IRepository<Service> _repository2;
        private readonly IRepository<CashBox> _repository3;

        public StatisticsService(AppDbContext dbContext, IMapper mapper, IRepository<Statistics> repository, IRepository<Finance> repository1, IRepository<CashBox> repository3) : base(dbContext)
        {
            _mapper = mapper;
            _repository = repository;
            _repository1 = repository1;
            _repository3 = repository3;
        }

        public async Task AddStatisticsAsync()
        {
            var Finances = await DbContext.Finances.Where(x => x.IsDeleted == false).ToListAsync();
                var Salaries = await DbContext.Salaries.Where(x => x.IsDeleted == false).ToListAsync();
            foreach (var finance in Finances)
            {
                decimal salaryCosts = 0;
                foreach (var salary in Salaries)
                {
                    if (salary.Date.Month == finance.Date.Month)
                        salaryCosts += salary.NetSalary;
                }

                var Payments = await DbContext.CashBoxes.Where(x => x.IsDeleted == false).ToListAsync();
                decimal payments = 0;
                foreach (var payment in Payments)
                {
                    if (payment.Date.Month == finance.Date.Month)
                        payments += payment.Payment;
                }
                var newStatistics = new Statistics
                {
                    Date = finance.Date,

                    Profit = payments - salaryCosts - finance.AdditionalCost - finance.CommunalCost

                };
                await DbContext.Statistics.AddAsync(newStatistics);
            }
        }

        public async Task<IList<StatisticsDto>> GetAllStatisticsAsync()
        {
            var Statisticses = await DbContext.Statistics.ToListAsync();
            return _mapper.Map<List<StatisticsDto>>(Statisticses); 
        }


    }
}
