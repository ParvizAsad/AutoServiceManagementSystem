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
    public class NonWorkingTypesController : ControllerBase
    {
        private readonly IRepository<NonWorkingType> _repository;
        private readonly IMapper _mapper;
        private readonly INonWorkingTypeService _service;

        public NonWorkingTypesController(IMapper mapper, IRepository<NonWorkingType> repository, INonWorkingTypeService service)
        {
            _mapper = mapper;
            _repository = repository;
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _service.GetAllNonWorkingTypesAsync());
        }

        [HttpGet("{id?}")]
        public async Task<IActionResult> Get([FromRoute] int? id)
        {
            if (id == null)
                return NotFound();

            var nonWorkingType = await _repository.GetAsync(id.Value);
            if (nonWorkingType == null)
                return NotFound();

            return Ok(_mapper.Map<NonWorkingTypeDto>(nonWorkingType));
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] NonWorkingTypeDto nonWorkingTypeDto)
        {
            var nonWorkingType = _mapper.Map<NonWorkingType>(nonWorkingTypeDto);

            await _repository.AddAsync(nonWorkingType);

            return Ok(nonWorkingType);
        }

        [HttpPut("{id?}")]
        public async Task<IActionResult> Put([FromRoute] int? id, [FromBody] NonWorkingTypeDto nonWorkingTypeDto)
        {
            if (id == null)
                return NotFound();

            if (id != nonWorkingTypeDto.Id)
                return BadRequest();

            var existNonWorkingType = await _repository.GetAsync(id.Value);
            if (existNonWorkingType == null)
                return NotFound();

            var nonWorkingType = _mapper.Map<NonWorkingType>(nonWorkingTypeDto);

            await _repository.UpdateAsync(nonWorkingType);

            return Ok();
        }

        [HttpDelete("{id?}")]
        public async Task<IActionResult> Delete([FromRoute] int? id)
        {
            if (id == null)
                return NotFound();

            var nonWorkingType = await _repository.GetAsync(id.Value);
            if (nonWorkingType == null)
                return NotFound();

            await _repository.DeleteAsync(nonWorkingType);

            return NoContent();
        }
    }
}
