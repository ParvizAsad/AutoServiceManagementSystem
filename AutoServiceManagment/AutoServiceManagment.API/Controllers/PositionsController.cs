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
    public class PositionsController : ControllerBase
    {
        private readonly IRepository<Position> _repository;
        private readonly IMapper _mapper;
        private readonly IPositionService _service;

        public PositionsController(IMapper mapper, IRepository<Position> repository, IPositionService service)
        {
            _mapper = mapper;
            _repository = repository;
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _service.GetAllPositionsAsync());
        }

        [HttpGet("{id?}")]
        public async Task<IActionResult> Get([FromRoute] int? id)
        {
            if (id == null)
                return NotFound();

            var position = await _repository.GetAsync(id.Value);
            if (position == null)
                return NotFound();

            return Ok(_mapper.Map<PositionDto>(position));
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] PositionDto positionDto)
        {
            var position = _mapper.Map<Position>(positionDto);

            await _repository.AddAsync(position);

            return Ok(position);
        }

        [HttpPut("{id?}")]
        public async Task<IActionResult> Put([FromRoute] int? id, [FromBody] PositionDto positionDto)
        {
            if (id == null)
                return NotFound();

            if (id != positionDto.Id)
                return BadRequest();

            var existPosition = await _repository.GetAsync(id.Value);
            if (existPosition == null)
                return NotFound();

            var position = _mapper.Map<Position>(positionDto);

            await _repository.UpdateAsync(position);

            return Ok();
        }

        [HttpDelete("{id?}")]
        public async Task<IActionResult> Delete([FromRoute] int? id)
        {
            if (id == null)
                return NotFound();

            var position = await _repository.GetAsync(id.Value);
            if (position == null)
                return NotFound();

            await _repository.DeleteAsync(position);

            return NoContent();
        }


    }
}
