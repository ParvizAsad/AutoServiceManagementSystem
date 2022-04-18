﻿using AutoMapper;
using AutoServiceManagment.DomainModels.DTOs;
using AutoServiceManagment.DomainModels.Entities;
using AutoServiceManagment.Repository.DataContext;
using AutoServiceManagment.Repository.Repository;
using AutoServiceManagment.Repository.Repository.Contracts;
using AutoServiceManagment.Services.Services.Contracts;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AutoServiceManagment.Services.Services
{
    public class PositionService : EfCoreRepository<Position>, IPositionService
    {
        private readonly IMapper _mapper;
        private readonly IRepository<Position> _repository;

        public PositionService(AppDbContext dbContext, IMapper mapper, IRepository<Position> repository) : base(dbContext)
        {
            _mapper = mapper;
            _repository = repository;
        }

        public async Task<IList<PositionDto>> GetAllPositionsAsync()
        {
            var positions = await GetAllAsync();

            return _mapper.Map<List<PositionDto>>(positions);
        }

        public async Task<PositionDto> GetPositionAsync(int id)
        {
            var position = await GetAsync(id);

            return _mapper.Map<PositionDto>(position);
        }
        public async Task AddPositionAsync(PositionDto positionDto)
        {
            var position = _mapper.Map<Position>(positionDto);
            await _repository.AddAsync(position);
        }

        public async Task DeletePositionAsync(int? id)
        {
            var position = await DbContext.Positions.FirstOrDefaultAsync(x => x.Id == id && x.IsDeleted == true);

            if (position == null) { throw new Exception("Position not found!"); }

            position.IsDeleted = true;

            await DbContext.SaveChangesAsync();
        }

        public async Task UpdatePositionAsyncId(int? id, PositionDto positionDto)
        {
            var position = await DbContext.Positions.FirstOrDefaultAsync(x => x.Id == id && x.IsDeleted == true);

            if (position == null) { throw new Exception("Finance not found!"); }

            position = _mapper.Map<Position>(positionDto);

            DbContext.Positions.Update(position);

            await DbContext.SaveChangesAsync();
        }
        public Task UpdatePositionAsync(PositionDto positionDto)
        {
            throw new System.NotImplementedException();
        }
    }
}
