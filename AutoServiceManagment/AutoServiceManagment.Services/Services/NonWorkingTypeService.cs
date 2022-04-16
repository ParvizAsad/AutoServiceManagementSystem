using AutoMapper;
using AutoServiceManagment.DomainModels.DTOs;
using AutoServiceManagment.DomainModels.Entities;
using AutoServiceManagment.Repository.DataContext;
using AutoServiceManagment.Repository.Repository;
using P320.Services.Services.Contracts;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace P320.Services.Services
{
    public class NonWorkingTypeService : EfCoreRepository<NonWorkingType>, INonWorkingTypeService
    {
        private readonly IMapper _mapper;

        public NonWorkingTypeService(AppDbContext dbContext, IMapper mapper):base(dbContext)
        {
            _mapper = mapper;
        }

        public async Task<IList<NonWorkingTypeDto>> GetAllNonWorkingTypesAsync()
        {
            var nonWorkingTypes = await GetAllAsync();

            return _mapper.Map<List<NonWorkingTypeDto>>(nonWorkingTypes);
        }
    }
}
