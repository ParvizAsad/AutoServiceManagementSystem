using AutoMapper;
using AutoServiceManagment.DomainModels.DTOs;
using AutoServiceManagment.DomainModels.Entities;
using AutoServiceManagment.Repository.DataContext;
using AutoServiceManagment.Repository.Repository;
using AutoServiceManagment.Repository.Repository.Contracts;
using AutoServiceManagment.Services.Services.Contracts;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AutoServiceManagment.Services.Services
{
    public class StatisticsService : EfCoreRepository<Statistics>, IStatisticsService
    {
        private readonly IMapper _mapper;
        private readonly IRepository<Statistics> _repository;
        private readonly IRepository<Finance> _repositoryFinance;
        private readonly IRepository<CashBox> _repositoryCashbox;

        public StatisticsService(AppDbContext dbContext, IMapper mapper, IRepository<Statistics> repository, IRepository<Finance> repositoryFinance, IRepository<CashBox> repositoryCashbox) : base(dbContext)
        {
            _mapper = mapper;
            _repository = repository;
            _repositoryFinance = repositoryFinance;
            _repositoryCashbox = repositoryCashbox;
        }

        public async Task<IList<StatisticsDto>> GetAllStatisticsAsync()
        {
            var Finances = await DbContext.Finances.Where(x => x.IsDeleted == false).ToListAsync();
            foreach (var finance in Finances)
            {
            var Salaries = await DbContext.Salaries.Where(x => x.IsDeleted == false).ToListAsync();
                double salaryCosts = 0;
                foreach (var salary in Salaries)
                {
                    if (salary.Date.Month == finance.Date.Month)
                        salaryCosts += salary.NetSalary;
                }

                var Payments = await DbContext.CashBoxes.Where(x => x.IsDeleted == false).ToListAsync();
                double payments = 0;
                foreach (var payment in Payments)
                {
                    if (payment.CreatedAt.Month == finance.Date.Month)
                        payments += payment.Payment;
                }
                var otherCustomerPayments = await DbContext.OtherCustomerPayments.Where(x => x.IsDeleted == false && x.CreatedAt.Month == finance.Date.Month).ToListAsync();

                double productBasePrices = 0;
                foreach (var otherCustomerPayment in otherCustomerPayments)
                {
                var product = await DbContext.Products.Where(x => x.IsDeleted == false && x.Id == otherCustomerPayment.ProductID).FirstOrDefaultAsync();
                    productBasePrices += product.BasePrice;
                }

                var newStatistics = new Statistics
                {
                    Date = finance.Date,

                    Profit = payments - productBasePrices - salaryCosts - finance.AdditionalCost - finance.CommunalCost
                };
                await DbContext.Statistics.AddAsync(newStatistics);
            }

            var Statisticses = await DbContext.Statistics.ToListAsync();
            return _mapper.Map<List<StatisticsDto>>(Statisticses); 
        }


    }
}
