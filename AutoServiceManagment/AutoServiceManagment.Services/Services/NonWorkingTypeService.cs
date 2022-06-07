using AutoMapper;
using AutoServiceManagment.DomainModels.DTOs;
using AutoServiceManagment.DomainModels.Entities;
using AutoServiceManagment.Infrastructure.Helpers;
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
    public class NonWorkingTypeService : EfCoreRepository<NonWorkingType>, INonWorkingTypeService
    {
        private readonly IMapper _mapper;
        private readonly IRepository<NonWorkingType> _repository;

        public NonWorkingTypeService(AppDbContext dbContext, IMapper mapper, IRepository<NonWorkingType> repository) :base(dbContext)
        {
            _mapper = mapper;
            _repository = repository;
        }

        public async Task<IList<NonWorkingTypeDto>> GetAllNonWorkingTypesAsync()
        {
            var nonWorkingTypes = await DbContext.NonWorkingTypes.Where(x => x.IsDeleted == false).ToListAsync();

            return _mapper.Map<List<NonWorkingTypeDto>>(nonWorkingTypes);
        }

        public async Task<NonWorkingTypeDto> GetNonWorkingTypeAsync(int id)
        {
            var nonWorkingType = await GetAsync(id);

            return _mapper.Map<NonWorkingTypeDto>(nonWorkingType);
        }
        public async Task AddNonWorkingTypeAsync(NonWorkingTypeDto nonWorkingTypeDto)
        {
            var existnonWorkingType = await DbContext.NonWorkingTypes.Where(x => x.Name == nonWorkingTypeDto.Name).FirstOrDefaultAsync();

            await NullCheck<NonWorkingType>.Checking(existnonWorkingType);

            var nonWorkingType = _mapper.Map<NonWorkingType>(nonWorkingTypeDto);

            await _repository.AddAsync(nonWorkingType);
        }

        public async Task DeleteNonWorkingTypeAsync(int? id)
        {
            var nonWorkingType = await DbContext.NonWorkingTypes.FirstOrDefaultAsync(x => x.Id == id && x.IsDeleted != true);

            if (nonWorkingType == null) { throw new Exception("Non-Working Type not found!"); }

            nonWorkingType.IsDeleted = true;

            await DbContext.SaveChangesAsync();
        }

        public async Task UpdateNonWorkingTypeAsyncId(int? id, NonWorkingTypeDto nonWorkingTypeDto)
        {
            var nonWorkingType = await DbContext.NonWorkingTypes.FirstOrDefaultAsync(x => x.Id == id && x.IsDeleted != true);

            if (nonWorkingType == null) { throw new Exception("Non-Working Type not found!"); }


            nonWorkingType.Name = nonWorkingTypeDto.Name;
            DbContext.NonWorkingTypes.Update(nonWorkingType);

            await DbContext.SaveChangesAsync();
        }
    }
}
