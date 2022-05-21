using AutoServiceManagment.DomainModels.DTOs;
using AutoServiceManagment.DomainModels.Entities;
using AutoServiceManagment.Repository.Repository.Contracts;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AutoServiceManagment.Services.Services.Contracts
{
    public interface IEmployeeService : IRepository<Employee>
    {
        Task<IList<EmployeeDto>> GetAllEmployeesAsync();
        Task<EmployeeDto> GetEmployeeAsync(int id);
        Task AddEmployeeAsync(EmployeeDto employeeDto);
        Task UpdateEmployeeAsyncId(int? id, EmployeeDto employeeDto);
        Task DeleteEmployeeAsync(int? Id);
        Task<string> SaveImage(IFormFile imageFile);
    }
}
