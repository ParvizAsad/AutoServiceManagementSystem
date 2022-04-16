﻿using AutoMapper;
using AutoServiceManagment.DomainModels.DTOs;
using AutoServiceManagment.DomainModels.Entities;
using AutoServiceManagment.Repository.DataContext;
using AutoServiceManagment.Repository.Repository;
using AutoServiceManagment.Services.Services.Contracts;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AutoServiceManagment.Services.Services
{
    public class EmployeeService : EfCoreRepository<Employee>, IEmployeeService
    {
        private readonly IMapper _mapper;

        public EmployeeService(AppDbContext dbContext, IMapper mapper):base(dbContext)
        {
            _mapper = mapper;
        }

        public async Task<IList<EmployeeDto>> GetAllEmployeesAsync()
        {
            var employees = await GetAllAsync();

            return _mapper.Map<List<EmployeeDto>>(employees);
        }

    }
}
