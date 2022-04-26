﻿using AutoMapper;
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

            var employees = await DbContext.Employees.Where(x => x.IsDeleted == false).ToListAsync();
            
            return _mapper.Map<List<EmployeeDto>>(employees);
        }

        public async Task<EmployeeDto> GetEmployeeAsync(int id)
        {
            var employee = await GetAsync(id);

            return _mapper.Map<EmployeeDto>(employee);
        }

        public async Task AddEmployeeAsync(EmployeeDto employeeDto/*, int positionId*/)
        {
            var existEmployee = await DbContext.Employees.Where(x => x.FullName == employeeDto.FullName).FirstOrDefaultAsync();
            if (existEmployee != null) { throw new Exception("There is an employee with this name!"); }

            //var positions = await DbContext.Positions.Where(x => x.IsDeleted == false).ToListAsync();
            //if (positionId == 0)
            //{
            //    throw new Exception("Select Position!");
            //}

            //var parentCategory = positions.FirstOrDefault(x => x.Id == positionId);
            //if (parentCategory == null)
            //    throw new Exception("Select Position!");
            //employeeDto.PositionId = positionId;

            var employee = _mapper.Map<Employee>(employeeDto);
            await _repository.AddAsync(employee);
        }

        public async Task DeleteEmployeeAsync(int? id)
        {
            var employee = await DbContext.Employees.FirstOrDefaultAsync(x => x.Id == id && x.IsDeleted != true);
            if (employee == null) { throw new Exception("Employee not found!"); }

            employee.IsDeleted = true;
            await DbContext.SaveChangesAsync();
        }

    
        public async Task UpdateEmployeeAsyncId(int? id, EmployeeDto employeeDto)
        {
            var employee = await DbContext.Employees.FirstOrDefaultAsync(x => x.Id == id && x.IsDeleted != true);
            if (employee == null) { throw new Exception("Employee not found!"); }

            var existEmployee = await DbContext.Employees.FirstOrDefaultAsync(x => x.FullName == employeeDto.FullName);
            if (existEmployee != null) { throw new Exception("There is an employee with this name!"); }

            employee.FullName = employeeDto.FullName;
            employee.BirthDate = employeeDto.BirthDate;

            DbContext.Employees.Update(employee);

            await DbContext.SaveChangesAsync();
        }


    }
}
