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
    public class FinancesController : ControllerBase
    {
        private readonly IRepository<Finance> _repository;
        private readonly IMapper _mapper;
        private readonly IFinanceService _service;

        public FinancesController(IMapper mapper, IRepository<Finance> repository, IFinanceService service)
        {
            _mapper = mapper;
            _repository = repository;
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _service.GetAllFinancesAsync());
        }

        [HttpGet("{id?}")]
        public async Task<IActionResult> Get([FromRoute] int? id)
        {
            if (id == null)
                return NotFound();

            var Finance = await _repository.GetAsync(id.Value);
            if (Finance == null)
                return NotFound();

            return Ok(_mapper.Map<FinanceDto>(Finance));
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] FinanceDto financeDto)
        {
            var Finance = _mapper.Map<Finance>(financeDto);

            await _repository.AddAsync(Finance);

            return Ok(Finance);
        }

        [HttpPut("{id?}")]
        public async Task<IActionResult> Put([FromRoute] int? id, [FromBody] FinanceDto financeDto)
        {
            if (id == null)
                return NotFound();

            if (id != financeDto.Id)
                return BadRequest();

            var existFinance = await _repository.GetAsync(id.Value);
            if (existFinance == null)
                return NotFound();

            var Finance = _mapper.Map<Finance>(financeDto);

            await _repository.UpdateAsync(Finance);

            return Ok();
        }

        [HttpDelete("{id?}")]
        public async Task<IActionResult> Delete([FromRoute] int? id)
        {
            if (id == null)
                return NotFound();

            var Finance = await _repository.GetAsync(id.Value);
            if (Finance == null)
                return NotFound();

            await _repository.DeleteAsync(Finance);

            return NoContent();
        }


    }
}
