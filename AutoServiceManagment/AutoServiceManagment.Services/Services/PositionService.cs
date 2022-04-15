﻿using AutoMapper;
using AutoServiceManagment.DomainModels.DTOs;
using AutoServiceManagment.DomainModels.Entities;
using AutoServiceManagment.Repository.DataContext;
using AutoServiceManagment.Repository.Repository;
using P320.Services.Services.Contracts;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace P320.Services.Services
{
    public class PositionService : EfCoreRepository<Position>, IPositionService
    {
        private readonly IMapper _mapper;

        public PositionService(AppDbContext dbContext, IMapper mapper):base(dbContext)
        {
            _mapper = mapper;
        }

        public async Task<IList<PositionDto>> GetAllPositionsAsync()
        {
            var students = await GetAllAsync();

            return _mapper.Map<List<PositionDto>>(students);
        }

        public object GetTest()
        {
            return "Test";
        }
    }
}
