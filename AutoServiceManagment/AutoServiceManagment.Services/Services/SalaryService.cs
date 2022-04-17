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
    public class SalaryService : EfCoreRepository<Salary>, ISalaryService
    {
        private readonly IMapper _mapper;
        private readonly IRepository<Salary> _repository;

        public SalaryService(AppDbContext dbContext, IMapper mapper):base(dbContext)
        {
            _mapper = mapper;
        }
        public async Task<IList<SalaryDto>> GetAllSalarysAsync()
        {
            var salaries = await GetAllAsync();

            return _mapper.Map<List<SalaryDto>>(salaries);
        }

        public async Task<SalaryDto> GetSalaryAsync(int id)
        {
            var salary = await GetAsync(id);

            return _mapper.Map<SalaryDto>(salary);
        }

        public async Task AddSalaryAsync(SalaryDto salaryDto)
        {
            var salary = _mapper.Map<Salary>(salaryDto);
            await _repository.AddAsync(salary);
        }

        public async Task DeleteSalaryAsync(int? id)
        {
            var salary = await _repository.GetAsync(id.Value);

            salary.IsDeleted = true;
        }
        public Task UpdateSalaryAsync(SalaryDto salaryDto)
        {
            throw new System.NotImplementedException();
        }
    }
}
