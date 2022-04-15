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
    public class SalaryService : EfCoreRepository<Salary>, ISalaryService
    {
        private readonly IMapper _mapper;

        public SalaryService(AppDbContext dbContext, IMapper mapper):base(dbContext)
        {
            _mapper = mapper;
        }

        public async Task<IList<SalaryDto>> GetAllSalarysAsync()
        {
            var students = await GetAllAsync();

            return _mapper.Map<List<SalaryDto>>(students);
        }

        public object GetTest()
        {
            return "Test";
        }
    }
}
