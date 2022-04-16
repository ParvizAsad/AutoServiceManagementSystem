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
    public class TaxesController : ControllerBase
    {
        private readonly IRepository<Tax> _repository;
        private readonly IMapper _mapper;
        private readonly ITaxService _service;

        public TaxesController(IMapper mapper, IRepository<Tax> repository, ITaxService service)
        {
            _mapper = mapper;
            _repository = repository;
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _service.GetAllTaxesAsync());
        }

        [HttpGet("{id?}")]
        public async Task<IActionResult> Get([FromRoute] int? id)
        {
            if (id == null)
                return NotFound();

            var Tax = await _repository.GetAsync(id.Value);
            if (Tax == null)
                return NotFound();

            return Ok(_mapper.Map<TaxDto>(Tax));
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] TaxDto taxDto)
        {
            var tax = _mapper.Map<Tax>(taxDto);

            await _repository.AddAsync(tax);

            return Ok(tax);
        }

        [HttpPut("{id?}")]
        public async Task<IActionResult> Put([FromRoute] int? id, [FromBody] TaxDto taxDto)
        {
            if (id == null)
                return NotFound();

            if (id != taxDto.Id)
                return BadRequest();

            var existTax = await _repository.GetAsync(id.Value);
            if (existTax == null)
                return NotFound();

            var tax = _mapper.Map<Tax>(taxDto);

            await _repository.UpdateAsync(tax);

            return Ok();
        }

        [HttpDelete("{id?}")]
        public async Task<IActionResult> Delete([FromRoute] int? id)
        {
            if (id == null)
                return NotFound();

            var tax = await _repository.GetAsync(id.Value);
            if (tax == null)
                return NotFound();

            await _repository.DeleteAsync(tax);

            return NoContent();
        }


    }
}
