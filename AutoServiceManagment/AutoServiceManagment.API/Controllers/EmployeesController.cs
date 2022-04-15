using AutoMapper;
using AutoServiceManagment.DomainModels.DTOs;
using AutoServiceManagment.DomainModels.Entities;
using AutoServiceManagment.Repository.Repository.Contracts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using P320.Services.Services.Contracts;
using System.Threading.Tasks;

namespace AutoServiceManagment.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly IRepository<Employee> _repository;
        private readonly IMapper _mapper;
        private readonly IEmployeeService _service;

        public EmployeesController(IMapper mapper, IRepository<Employee> repository, IEmployeeService service)
        {
            _mapper = mapper;
            _repository = repository;
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _service.GetAllEmployeesAsync());
        }

        [HttpGet("{id?}")]
        public async Task<IActionResult> Get([FromRoute] int? id)
        {
            if (id == null)
                return NotFound();

            var Employee = await _repository.GetAsync(id.Value);
            if (Employee == null)
                return NotFound();

            return Ok(_mapper.Map<EmployeeDto>(Employee));
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] EmployeeDto employeeDto)
        {
            var employee = _mapper.Map<Employee>(employeeDto);

            await _repository.AddAsync(employee);

            return Ok(employee);
        }

        [HttpPut("{id?}")]
        public async Task<IActionResult> Put([FromRoute] int? id, [FromBody] EmployeeDto employeeDto)
        {
            if (id == null)
                return NotFound();

            if (id != employeeDto.Id)
                return BadRequest();

            var existEmployee = await _repository.GetAsync(id.Value);
            if (existEmployee == null)
                return NotFound();

            var Employee = _mapper.Map<Employee>(employeeDto);

            await _repository.UpdateAsync(Employee);

            return Ok();
        }

        [HttpDelete("{id?}")]
        public async Task<IActionResult> Delete([FromRoute] int? id)
        {
            if (id == null)
                return NotFound();

            var employee = await _repository.GetAsync(id.Value);
            if (employee == null)
                return NotFound();

            await _repository.DeleteAsync(employee);

            return NoContent();
        }

    }
}
