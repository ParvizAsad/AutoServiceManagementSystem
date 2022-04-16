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
    public class SalariesController : ControllerBase
    {
        private readonly IRepository<Salary> _repository;
        private readonly IMapper _mapper;
        private readonly ISalaryService _service;

        public SalariesController(IMapper mapper, IRepository<Salary> repository, ISalaryService service)
        {
            _mapper = mapper;
            _repository = repository;
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _service.GetAllSalarysAsync());
        }

        [HttpGet("{id?}")]
        public async Task<IActionResult> Get([FromRoute] int? id)
        {
            if (id == null)
                return NotFound();

            var salary = await _repository.GetAsync(id.Value);
            if (salary == null)
                return NotFound();

            return Ok(_mapper.Map<SalaryDto>(salary));
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] SalaryDto salaryDto)
        {
            var salary = _mapper.Map<Salary>(salaryDto);

            await _repository.AddAsync(salary);

            return Ok(salary);
        }

        [HttpPut("{id?}")]
        public async Task<IActionResult> Put([FromRoute] int? id, [FromBody] SalaryDto salaryDto)
        {
            if (id == null)
                return NotFound();

            if (id != salaryDto.Id)
                return BadRequest();

            var existSalary = await _repository.GetAsync(id.Value);
            if (existSalary == null)
                return NotFound();

            var Salary = _mapper.Map<Salary>(salaryDto);

            await _repository.UpdateAsync(Salary);

            return Ok();
        }

        [HttpDelete("{id?}")]
        public async Task<IActionResult> Delete([FromRoute] int? id)
        {
            if (id == null)
                return NotFound();

            var salary = await _repository.GetAsync(id.Value);
            if (salary == null)
                return NotFound();

            await _repository.DeleteAsync(salary);

            return NoContent();
        }


    }
}
