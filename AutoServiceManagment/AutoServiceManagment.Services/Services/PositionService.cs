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
            var position = await _repository.GetAsync(id.Value);

            position.IsDeleted = true;
        }

        public Task UpdatePositionAsync(PositionDto positionDto)
        {
            throw new System.NotImplementedException();
        }
    }
}
