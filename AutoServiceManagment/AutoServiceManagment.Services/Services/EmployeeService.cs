using AutoMapper;
using AutoServiceManagment.DomainModels.DTOs;
using AutoServiceManagment.DomainModels.Entities;
using AutoServiceManagment.Repository.DataContext;
using AutoServiceManagment.Repository.Repository;
using AutoServiceManagment.Repository.Repository.Contracts;
using AutoServiceManagment.Services.Services.Contracts;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using AutoServiceManagment.Infrastructure.Helpers;

namespace AutoServiceManagment.Services.Services
{
    public class EmployeeService : EfCoreRepository<Employee>, IEmployeeService
    {
        private readonly IMapper _mapper;
        private readonly IRepository<Employee> _repository;
        private readonly IWebHostEnvironment _hostEnvironment;

        public EmployeeService(AppDbContext dbContext, IMapper mapper, IRepository<Employee> repository, IWebHostEnvironment hostEnvironment) : base(dbContext)
        {
            _mapper = mapper;
            _repository = repository;
            _hostEnvironment = hostEnvironment;
        }

        public async Task<IList<EmployeeDto>> GetAllEmployeesAsync()
        {

            var employees = await DbContext.Employees.Where(x => x.IsDeleted == false).Include(x=>x.Position).ToListAsync();
            
            return _mapper.Map<List<EmployeeDto>>(employees);
        }

        public async Task<EmployeeDto> GetEmployeeAsync(int id)
        {
            var employee = await GetAsync(id);

            return _mapper.Map<EmployeeDto>(employee);
        }

        public async Task AddEmployeeAsync(EmployeeDto employeeDto)
        {
            var existEmployee = await DbContext.Employees.Where(x => x.FullName == employeeDto.FullName).FirstOrDefaultAsync();

            await NullCheck<Employee>.Checking(existEmployee);

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

            var existEmployee = await DbContext.Employees.FirstOrDefaultAsync(x => x.FullName == employeeDto.FullName && x.Id!=employeeDto.Id);
            if (existEmployee != null) { throw new Exception("There is an employee with this name!"); }

            employee.FullName = employeeDto.FullName;
            employee.BirthDate = employeeDto.BirthDate;
            employee.EducationLevel=employeeDto.EducationLevel;
            employee.BaseSalary=employeeDto.BaseSalary;
            employee.Location = employeeDto.Location;
            employee.PositionId = employeeDto.PositionId;
            employee.OrderNumber= employeeDto.OrderNumber;
            employee.PhoneNumber= employeeDto.PhoneNumber;
            employee.PersonalDetails = employeeDto.PersonalDetails;
            employee.ImageName= employeeDto.ImageName;

            DbContext.Employees.Update(employee);

            await DbContext.SaveChangesAsync();
        }

        public async Task<string> SaveImage(IFormFile imageFile)
        {
           string imageName = new string(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(' ' , '-');
            imageName= imageName+Guid.NewGuid().ToString()+Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, "Images", imageName);
            using (var fileStream=new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }
            return imageName;
        }
    }
}
