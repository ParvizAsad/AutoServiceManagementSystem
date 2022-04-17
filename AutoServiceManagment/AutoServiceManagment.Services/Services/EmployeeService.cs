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
    public class EmployeeService : EfCoreRepository<Employee>, IEmployeeService
    {
        private readonly IMapper _mapper;
        private readonly IRepository<Employee> _repository;

        public EmployeeService(AppDbContext dbContext, IMapper mapper, IRepository<Employee> repository) : base(dbContext)
        {
            _mapper = mapper;
            _repository = repository;
        }

        public async Task<IList<EmployeeDto>> GetAllEmployeesAsync()
        {
            var employees = await GetAllAsync();

            return _mapper.Map<List<EmployeeDto>>(employees);
        }

        public async Task<EmployeeDto> GetEmployeeAsync(int id)
        {
            var employee = await GetAsync(id);

            return _mapper.Map<EmployeeDto>(employee);
        }
        public async Task AddEmployeeAsync(EmployeeDto employeeDto)
        {
            var employee = _mapper.Map<Employee>(employeeDto);
            await _repository.AddAsync(employee);
        }

        public async Task DeleteEmployeeAsync(int? id)
        {
            var employee = await _repository.GetAsync(id.Value);

            employee.IsDeleted = true;
        }

        public Task UpdateEmployeeAsync(EmployeeDto employeeDto)
        {
            throw new System.NotImplementedException();
        }

    }
}
