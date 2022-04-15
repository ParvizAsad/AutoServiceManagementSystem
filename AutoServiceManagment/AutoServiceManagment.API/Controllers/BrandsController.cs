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
    public class BrandsController : ControllerBase
    {
        private readonly IRepository<Brand> _repository;
        private readonly IMapper _mapper;
        private readonly IBrandService _service;

        public BrandsController(IMapper mapper, IRepository<Brand> repository, IBrandService service)
        {
            _mapper = mapper;
            _repository = repository;
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _service.GetAllBrandsAsync());
        }

        [HttpGet("{id?}")]
        public async Task<IActionResult> Get([FromRoute] int? id)
        {
            if (id == null)
                return NotFound();

            var brand = await _repository.GetAsync(id.Value);
            if (brand == null)
                return NotFound();

            return Ok(_mapper.Map<BrandDto>(brand));
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] BrandDto brandDto)
        {
            var brand = _mapper.Map<Brand>(brandDto);

            await _repository.AddAsync(brand);

            return Ok(brand);
        }

        [HttpPut("{id?}")]
        public async Task<IActionResult> Put([FromRoute] int? id, [FromBody] BrandDto brandDto)
        {
            if (id == null)
                return NotFound();

            if (id != brandDto.Id)
                return BadRequest();

            var existBrand = await _repository.GetAsync(id.Value);
            if (existBrand == null)
                return NotFound();

            var brand = _mapper.Map<Brand>(brandDto);

            await _repository.UpdateAsync(brand);

            return Ok();
        }

        [HttpDelete("{id?}")]
        public async Task<IActionResult> Delete([FromRoute] int? id)
        {
            if (id == null)
                return NotFound();

            var brand = await _repository.GetAsync(id.Value);
            if (brand == null)
                return NotFound();

            await _repository.DeleteAsync(brand);

            return NoContent();
        }


    }
}
