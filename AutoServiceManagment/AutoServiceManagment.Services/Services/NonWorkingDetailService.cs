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
    public class NonWorkingDetailService : EfCoreRepository<NonWorkingDetail>, INonWorkingDetailService
    {
        private readonly IMapper _mapper;

        public NonWorkingDetailService(AppDbContext dbContext, IMapper mapper):base(dbContext)
        {
            _mapper = mapper;
        }

        public async Task<IList<NonWorkingDetailDto>> GetAllNonWorkingDetailsAsync()
        {
            var nonWorkingDetails = await GetAllAsync();

            return _mapper.Map<List<NonWorkingDetailDto>>(nonWorkingDetails);
        }
    }
}
