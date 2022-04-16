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
    public class NonWorkingDetailsController : ControllerBase
    {
        private readonly IRepository<NonWorkingDetail> _repository;
        private readonly IMapper _mapper;
        private readonly INonWorkingDetailService _service;

        public NonWorkingDetailsController(IMapper mapper, IRepository<NonWorkingDetail> repository, INonWorkingDetailService service)
        {
            _mapper = mapper;
            _repository = repository;
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _service.GetAllNonWorkingDetailsAsync());
        }

        [HttpGet("{id?}")]
        public async Task<IActionResult> Get([FromRoute] int? id)
        {
            if (id == null)
                return NotFound();

            var nonWorkingDetail = await _repository.GetAsync(id.Value);
            if (nonWorkingDetail == null)
                return NotFound();

            return Ok(_mapper.Map<NonWorkingDetailDto>(nonWorkingDetail));
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] NonWorkingDetailDto nonWorkingDetailDto)
        {
            var nonWorkingDetail = _mapper.Map<NonWorkingDetail>(nonWorkingDetailDto);

            await _repository.AddAsync(nonWorkingDetail);

            return Ok(nonWorkingDetail);
        }

        [HttpPut("{id?}")]
        public async Task<IActionResult> Put([FromRoute] int? id, [FromBody] NonWorkingDetailDto nonWorkingDetailDto)
        {
            if (id == null)
                return NotFound();

            if (id != nonWorkingDetailDto.Id)
                return BadRequest();

            var existNonWorkingDetail = await _repository.GetAsync(id.Value);
            if (existNonWorkingDetail == null)
                return NotFound();

            var nonWorkingDetail = _mapper.Map<NonWorkingDetail>(nonWorkingDetailDto);

            await _repository.UpdateAsync(nonWorkingDetail);

            return Ok();
        }

        [HttpDelete("{id?}")]
        public async Task<IActionResult> Delete([FromRoute] int? id)
        {
            if (id == null)
                return NotFound();

            var nonWorkingDetail = await _repository.GetAsync(id.Value);
            if (nonWorkingDetail == null)
                return NotFound();

            await _repository.DeleteAsync(nonWorkingDetail);

            return NoContent();
        }
    }
}
