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
    public class NonWorkingDetailService : EfCoreRepository<NonWorkingDetail>, INonWorkingDetailService
    {
        private readonly IMapper _mapper;
        private readonly IRepository<NonWorkingDetail> _repository;

        public NonWorkingDetailService(AppDbContext dbContext, IMapper mapper, IRepository<NonWorkingDetail> repository) : base(dbContext)
        {
            _mapper = mapper;
            _repository = repository;
        }

        public async Task<IList<NonWorkingDetailDto>> GetAllNonWorkingDetailsAsync()
        {
            var nonWorkingDetails = await GetAllAsync();

            return _mapper.Map<List<NonWorkingDetailDto>>(nonWorkingDetails);
        }

        public async Task AddNonWorkingDetailAsync(NonWorkingDetailDto nonWorkingDetailDto)
        {
            var nonWorkingDetail = _mapper.Map<NonWorkingDetail>(nonWorkingDetailDto);
            await _repository.AddAsync(nonWorkingDetail);
        }

        public async Task DeleteNonWorkingDetailAsync(int? id)
        {
            var nonWorkingDetail = await _repository.GetAsync(id.Value);

            nonWorkingDetail.IsDeleted = true;
        }

        public Task UpdateNonWorkingDetailAsync(NonWorkingDetailDto nonWorkingDetailDto)
        {
            throw new System.NotImplementedException();
        }
    }
}
