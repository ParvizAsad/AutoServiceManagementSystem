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
        private readonly IRepository<Customer> _repository;
        private readonly IMapper _mapper;
        private readonly ICustomerService _service;

        public TaxesController(IMapper mapper, IRepository<Customer> repository, ICustomerService service)
        {
            _mapper = mapper;
            _repository = repository;
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _service.GetAllCustomersAsync());
        }

        [HttpGet("{id?}")]
        public async Task<IActionResult> Get([FromRoute] int? id)
        {
            if (id == null)
                return NotFound();

            var customer = await _repository.GetAsync(id.Value);
            if (customer == null)
                return NotFound();

            return Ok(_mapper.Map<CustomerDto>(customer));
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CustomerDto customerDto)
        {
            var customer = _mapper.Map<Customer>(customerDto);

            await _repository.AddAsync(customer);

            return Ok(customer);
        }

        [HttpPut("{id?}")]
        public async Task<IActionResult> Put([FromRoute] int? id, [FromBody] CustomerDto customerDto)
        {
            if (id == null)
                return NotFound();

            if (id != customerDto.Id)
                return BadRequest();

            var existCustomer = await _repository.GetAsync(id.Value);
            if (existCustomer == null)
                return NotFound();

            var Customer = _mapper.Map<Customer>(customerDto);

            await _repository.UpdateAsync(Customer);

            return Ok();
        }

        [HttpDelete("{id?}")]
        public async Task<IActionResult> Delete([FromRoute] int? id)
        {
            if (id == null)
                return NotFound();

            var customer = await _repository.GetAsync(id.Value);
            if (customer == null)
                return NotFound();

            await _repository.DeleteAsync(customer);

            return NoContent();
        }


    }
}
