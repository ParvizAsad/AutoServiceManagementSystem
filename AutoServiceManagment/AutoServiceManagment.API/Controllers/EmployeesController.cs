using AutoMapper;
using AutoServiceManagment.DomainModels.DTOs;
using AutoServiceManagment.DomainModels.Entities;
using AutoServiceManagment.Repository.Repository.Contracts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using AutoServiceManagment.Services.Services.Contracts;
using System.Threading.Tasks;

namespace AutoServiceManagment.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeeService _service;

        public EmployeesController(IMapper mapper, IRepository<Employee> repository, IEmployeeService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _service.GetAllEmployeesAsync());
        }

        //[HttpGet("{id?}")]
        //public async Task<IActionResult> Get([FromRoute] int? id)
        //{
        //    return Ok(await _service.GetEmployeeAsync(id.Value));
        //}

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] EmployeeDto employeeDto)
        {
            await _service.AddEmployeeAsync(employeeDto);
            return Ok();
        }

        [HttpPut("{id?}")]
        public async Task<IActionResult> Put([FromRoute] int? id, [FromBody] EmployeeDto employeeDto)
        {
            await _service.UpdateEmployeeAsync(employeeDto);
            return Ok();
        }

        [HttpDelete("{id?}")]
        public async Task<IActionResult> Delete([FromRoute] int? id)
        {
            await _service.DeleteEmployeeAsync(id.Value);

            return NoContent();
        }

    }
}
