using AutoMapper;
using AutoServiceManagment.DomainModels.DTOs;
using AutoServiceManagment.DomainModels.Entities;
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
    public class SalaryService : EfCoreRepository<Salary>, ISalaryService
    {
        private readonly IMapper _mapper;
        private readonly IRepository<Salary> _repository;
        private readonly IRepository<Employee> _repository1;
        private readonly IRepository<Tax> _repository2;

        public SalaryService(AppDbContext dbContext, IMapper mapper, IRepository<Salary> repository, IRepository<Employee> repository1, IRepository<Tax> repository2) : base(dbContext)
        {
            _mapper = mapper;
            _repository = repository;
            _repository1 = repository1;
            _repository2 = repository2;
        }
        public async Task<IList<SalaryDto>> GetAllSalarysAsync()
        {
            var salaries = await DbContext.Salaries.Where(x => x.IsDeleted == false).ToListAsync();

            foreach (var salary in salaries)
            {
                var employee = await DbContext.Employees.Where(x => x.Id == salary.EmployeeID).FirstOrDefaultAsync();
                var tax = await DbContext.Taxes.Where(x => x.Id == salary.TaxID).FirstOrDefaultAsync();

                salary.NetSalary = (employee.BaseSalary + salary.Bonus) * (1 - (tax.TaxValue) / 100);
            }

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
            var salary = await DbContext.Salaries.FirstOrDefaultAsync(x => x.Id == id && x.IsDeleted != true);

            if (salary == null) { throw new Exception("Salary not found!"); }

            salary.IsDeleted = true;

            await DbContext.SaveChangesAsync();
        }

        public async Task UpdateSalaryAsyncId(int? id, SalaryDto salaryDto)
        {
            var salary = await DbContext.Salaries.FirstOrDefaultAsync(x => x.Id == id && x.IsDeleted != true);

            if (salary == null) { throw new Exception("Salary not found!"); }

            salary.Bonus = salaryDto.Bonus;
            salary.OverTime = salaryDto.Overtime;
            salary.Date = salaryDto.Date;
            salary.EmployeeID = salaryDto.EmployeeID;
            salary.TaxID = salaryDto.TaxID;

            DbContext.Salaries.Update(salary);

            await DbContext.SaveChangesAsync();
        }
    }
}
