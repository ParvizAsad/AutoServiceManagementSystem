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
        private readonly IRepository<Employee> _repositoryEmployee;
        private readonly IRepository<Tax> _repositoryTax;
        private readonly IRepository<NonWorkingDetail> _repositoryNonWorkingDetail;

        public SalaryService(AppDbContext dbContext, IMapper mapper, IRepository<Salary> repository, IRepository<Employee> repositoryEmployee, IRepository<Tax> repositoryTax, IRepository<NonWorkingDetail> repositoryNonWorkingDetail) : base(dbContext)
        {
            _mapper = mapper;
            _repository = repository;
            _repositoryEmployee = repositoryEmployee;
            _repositoryTax = repositoryTax;
            _repositoryNonWorkingDetail=repositoryNonWorkingDetail;
        }
        public async Task<IList<SalaryDto>> GetAllSalarysAsync()
        {
            var salaries = await DbContext.Salaries.Where(x => x.IsDeleted == false).ToListAsync();
            foreach (var salary in salaries)
            {
            var employee = await DbContext.Employees.Where(x => x.Id==salary.EmployeeID).FirstOrDefaultAsync();
            var nonWorkingDetail = await DbContext.NonWorkingDetails.Where(x => x.EmployeeId==salary.EmployeeID && x.StartTime.Month== salary.Date.Month).FirstOrDefaultAsync();
            var days = nonWorkingDetail.EndTime.Day - nonWorkingDetail.StartTime.Day;
            var tax = await DbContext.Taxes.Where(x => x.Id==salary.TaxID).FirstOrDefaultAsync();

                salary.NetSalary = (employee.BaseSalary + salary.Bonus) * (100 - (tax.TaxValue))*(30-days)/(100*30);
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
            salary.Date = salaryDto.Date;
            salary.EmployeeID = salaryDto.EmployeeID;
            salary.TaxID = salaryDto.TaxID;

            DbContext.Salaries.Update(salary);

            await DbContext.SaveChangesAsync();
        }
    }
}
