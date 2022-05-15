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
        // Task AddEmployeesAsync(IEnumerable<EmployeeDto> employeeDtos);
        //  Task AddEmployeesAsync(params EmployeeDto[] employeeDtos);
        Task UpdateEmployeeAsyncId(int? id, EmployeeDto employeeDto);
        // Task UpdateEmployeesAsync(IEnumerable<EmployeeDto> employeeDtos);
        // Task UpdateEmployeesAsync(params EmployeeDto[] employeeDtos);
        Task DeleteEmployeeAsync(int? Id);
        Task<string> SaveImage(IFormFile imageFile);
        // Task DeleteEmployeesAsync(IEnumerable<int> Id);
        //  Task DeleteEmployeesAsync(params int[] Id);
    }
}
