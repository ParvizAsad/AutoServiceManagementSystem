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
    public class ProductsController : ControllerBase
    {
        private readonly IRepository<Product> _repository;
        private readonly IMapper _mapper;
        private readonly IProductService _service;

        public ProductsController(IMapper mapper, IRepository<Product> repository, IProductService service)
        {
            _mapper = mapper;
            _repository = repository;
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _service.GetAllProductsAsync());
        }

        [HttpGet("{id?}")]
        public async Task<IActionResult> Get([FromRoute] int? id)
        {
            if (id == null)
                return NotFound();

            var product = await _repository.GetAsync(id.Value);
            if (product == null)
                return NotFound();

            return Ok(_mapper.Map<ProductDto>(product));
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ProductDto productDto)
        {
            var product = _mapper.Map<Product>(productDto);

            await _repository.AddAsync(product);

            return Ok(product);
        }

        [HttpPut("{id?}")]
        public async Task<IActionResult> Put([FromRoute] int? id, [FromBody] ProductDto productDto)
        {
            if (id == null)
                return NotFound();

            if (id != productDto.Id)
                return BadRequest();

            var existProduct = await _repository.GetAsync(id.Value);
            if (existProduct == null)
                return NotFound();

            var product = _mapper.Map<Product>(productDto);

            await _repository.UpdateAsync(product);

            return Ok();
        }

        [HttpDelete("{id?}")]
        public async Task<IActionResult> Delete([FromRoute] int? id)
        {
            if (id == null)
                return NotFound();

            var product = await _repository.GetAsync(id.Value);
            if (product == null)
                return NotFound();

            await _repository.DeleteAsync(product);

            return NoContent();
        }


    }
}
