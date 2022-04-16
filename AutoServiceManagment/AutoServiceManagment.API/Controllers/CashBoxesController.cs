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
    public class CashBoxesController : ControllerBase
    {
        private readonly IRepository<CashBox> _repository;
        private readonly IMapper _mapper;
        private readonly ICashBoxService _service;

        public CashBoxesController(IMapper mapper, IRepository<CashBox> repository, ICashBoxService service)
        {
            _mapper = mapper;
            _repository = repository;
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _service.GetAllCashBoxsAsync());
        }

        [HttpGet("{id?}")]
        public async Task<IActionResult> Get([FromRoute] int? id)
        {
            if (id == null)
                return NotFound();

            var cashBox = await _repository.GetAsync(id.Value);
            if (cashBox == null)
                return NotFound();

            return Ok(_mapper.Map<CashBoxDto>(cashBox));
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CashBoxDto cashBoxDto)
        {
            var cashBox = _mapper.Map<CashBox>(cashBoxDto);

            await _repository.AddAsync(cashBox);

            return Ok(cashBox);
        }

        [HttpPut("{id?}")]
        public async Task<IActionResult> Put([FromRoute] int? id, [FromBody] CashBoxDto cashBoxDto)
        {
            if (id == null)
                return NotFound();

            if (id != cashBoxDto.Id)
                return BadRequest();

            var existcashBox = await _repository.GetAsync(id.Value);
            if (existcashBox == null)
                return NotFound();

            var cashBox = _mapper.Map<CashBox>(cashBoxDto);

            await _repository.UpdateAsync(cashBox);

            return Ok();
        }

        [HttpDelete("{id?}")]
        public async Task<IActionResult> Delete([FromRoute] int? id)
        {
            if (id == null)
                return NotFound();

            var cashBox = await _repository.GetAsync(id.Value);
            if (cashBox == null)
                return NotFound();

            await _repository.DeleteAsync(cashBox);

            return NoContent();
        }


    }
}
