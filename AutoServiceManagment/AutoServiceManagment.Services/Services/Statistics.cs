//using AutoMapper;
//using AutoServiceManagment.DomainModels.DTOs;
//using AutoServiceManagment.DomainModels.Entities;
//using AutoServiceManagment.Repository.DataContext;
//using AutoServiceManagment.Repository.Repository;
//using AutoServiceManagment.Repository.Repository.Contracts;
//using AutoServiceManagment.Services.Services.Contracts;
//using Microsoft.EntityFrameworkCore;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Threading.Tasks;

//namespace AutoServiceManagment.Services.Services
//{
//    public class StatisticsService : EfCoreRepository<Finance>, IStatisticsService
//    {
//        private readonly IMapper _mapper;
//        private readonly IRepository<Finance> _repository;
//        private readonly IRepository<Service> _repository2;

//        public StatisticsService(AppDbContext dbContext, IMapper mapper, IRepository<Finance> repository) : base(dbContext)
//        {
//            _mapper = mapper;
//            _repository = repository;
//        }

//        public async Task<IList<StatisticsDto>> GetAllStatisticsesAsync()
//        {

//            var Statisticses = await DbContext.Statisticses.Where(x => x.IsDeleted == false).ToListAsync();
//            return _mapper.Map<List<StatisticsDto>>(Statisticses);
//        }
//    }
//}
