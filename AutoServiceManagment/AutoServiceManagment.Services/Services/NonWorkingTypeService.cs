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
    public class NonWorkingTypeService : EfCoreRepository<NonWorkingType>, INonWorkingTypeService
    {
        private readonly IMapper _mapper;
        private readonly IRepository<NonWorkingType> _repository;

        public NonWorkingTypeService(AppDbContext dbContext, IMapper mapper):base(dbContext)
        {
            _mapper = mapper;
        }

        public async Task<IList<NonWorkingTypeDto>> GetAllNonWorkingTypesAsync()
        {
            var nonWorkingTypes = await GetAllAsync();

            return _mapper.Map<List<NonWorkingTypeDto>>(nonWorkingTypes);
        }

        public async Task<NonWorkingTypeDto> GetNonWorkingTypeAsync(int id)
        {
            var nonWorkingType = await GetAsync(id);

            return _mapper.Map<NonWorkingTypeDto>(nonWorkingType);
        }
        public async Task AddNonWorkingTypeAsync(NonWorkingTypeDto nonWorkingTypeDto)
        {
            var nonWorkingType = _mapper.Map<NonWorkingType>(nonWorkingTypeDto);
            await _repository.AddAsync(nonWorkingType);
        }

        public async Task DeleteNonWorkingTypeAsync(int? id)
        {
            var nonWorkingType = await _repository.GetAsync(id.Value);

            nonWorkingType.IsDeleted = true;
        }

        public Task UpdateNonWorkingTypeAsync(NonWorkingTypeDto nonWorkingTypeDto)
        {
            throw new System.NotImplementedException();
        }
    }
}
