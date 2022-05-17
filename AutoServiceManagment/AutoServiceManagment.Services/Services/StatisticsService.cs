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

        public StatisticsService(AppDbContext dbContext, IMapper mapper, IRepository<Statistics> repository, IRepository<Finance> repository1) : base(dbContext)
        {
            _mapper = mapper;
            _repository = repository;
            _repository1 = repository1;
        }

        public async Task AddStatisticsAsync()
        {
            var Fianances = await DbContext.Finances.ToListAsync();
            foreach (var finance in Fianances)
            {
            var Salaries = await DbContext.Salaries.ToListAsync();
                var salaryCosts = new Decimal();
                foreach (var salary in Salaries)
                {
                    if (salary.Date == finance.Date)
                        salaryCosts += salary.NetSalary;
                }


                var statistics = new Statistics();
                statistics.Date = finance.Date;
                statistics.Profit =- salaryCosts - finance.AdditionalCost - finance.CommunalCost;
            }
        }
        public async Task<IList<StatisticsDto>> GetAllStatisticsAsync()
        {
            var Statisticses = await DbContext.Statistics.ToListAsync();
            return _mapper.Map<List<StatisticsDto>>(Statisticses); 
        }


    }
}
