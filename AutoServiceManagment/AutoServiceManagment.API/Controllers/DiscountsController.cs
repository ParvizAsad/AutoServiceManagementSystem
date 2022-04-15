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
    public class DiscountsController : ControllerBase
    {
        private readonly IRepository<Discount> _repository;
        private readonly IMapper _mapper;
        private readonly IDiscountService _service;

        public DiscountsController(IMapper mapper, IRepository<Discount> repository, IDiscountService service)
        {
            _mapper = mapper;
            _repository = repository;
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _service.GetAllDiscountsAsync());
        }

        [HttpGet("{id?}")]
        public async Task<IActionResult> Get([FromRoute] int? id)
        {
            if (id == null)
                return NotFound();

            var discount = await _repository.GetAsync(id.Value);
            if (discount == null)
                return NotFound();

            return Ok(_mapper.Map<DiscountDto>(discount));
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] DiscountDto discountDto)
        {
            var discount = _mapper.Map<Discount>(discountDto);

            await _repository.AddAsync(discount);

            return Ok(discount);
        }

        [HttpPut("{id?}")]
        public async Task<IActionResult> Put([FromRoute] int? id, [FromBody] DiscountDto discountDto)
        {
            if (id == null)
                return NotFound();

            if (id != discountDto.Id)
                return BadRequest();

            var existDiscount = await _repository.GetAsync(id.Value);
            if (existDiscount == null)
                return NotFound();

            var discount = _mapper.Map<Discount>(discountDto);

            await _repository.UpdateAsync(discount);

            return Ok();
        }

        [HttpDelete("{id?}")]
        public async Task<IActionResult> Delete([FromRoute] int? id)
        {
            if (id == null)
                return NotFound();

            var discount = await _repository.GetAsync(id.Value);
            if (discount == null)
                return NotFound();

            await _repository.DeleteAsync(discount);

            return NoContent();
        }


    }
}
