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
    public class ServicesController : ControllerBase
    {
        private readonly IRepository<Service> _repository;
        private readonly IMapper _mapper;
        private readonly IServiceService _service;

        public ServicesController(IMapper mapper, IRepository<Service> repository, IServiceService service)
        {
            _mapper = mapper;
            _repository = repository;
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _service.GetAllServicesAsync());
        }

        [HttpGet("{id?}")]
        public async Task<IActionResult> Get([FromRoute] int? id)
        {
            if (id == null)
                return NotFound();

            var service = await _repository.GetAsync(id.Value);
            if (service == null)
                return NotFound();

            return Ok(_mapper.Map<ServiceDto>(service));
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ServiceDto serviceDto)
        {
            var service = _mapper.Map<Service>(serviceDto);

            await _repository.AddAsync(service);

            return Ok(service);
        }

        [HttpPut("{id?}")]
        public async Task<IActionResult> Put([FromRoute] int? id, [FromBody] ServiceDto serviceDto)
        {
            if (id == null)
                return NotFound();

            if (id != serviceDto.Id)
                return BadRequest();

            var existService = await _repository.GetAsync(id.Value);
            if (existService == null)
                return NotFound();

            var service = _mapper.Map<Service>(serviceDto);

            await _repository.UpdateAsync(service);

            return Ok();
        }

        [HttpDelete("{id?}")]
        public async Task<IActionResult> Delete([FromRoute] int? id)
        {
            if (id == null)
                return NotFound();

            var service = await _repository.GetAsync(id.Value);
            if (service == null)
                return NotFound();

            await _repository.DeleteAsync(service);

            return NoContent();
        }


    }
}
