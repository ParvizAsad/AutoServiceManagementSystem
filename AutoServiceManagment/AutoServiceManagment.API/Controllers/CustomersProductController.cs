using AutoServiceManagment.DomainModels.DTOs;
using Microsoft.AspNetCore.Mvc;
using AutoServiceManagment.Services.Services.Contracts;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;

namespace AutoServiceManagment.API.Controllers
{
    [EnableCors("AllowCors"), Route("api/[controller]")]
    [ApiController]
    public class CustomersProductController : ControllerBase
    {
        private readonly ICustomerProductService _service;

        public CustomersProductController(ICustomerProductService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _service.GetAllCustomersProductAsync());
        }

        [HttpGet("{id?}")]
        public async Task<IActionResult> Get([FromRoute] int? id)
        {
            return Ok(await _service.GetCustomersProductAsync(id.Value));
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CustomerProductDto customerProductDto)
        {
            await _service.AddCustomerProductAsync(customerProductDto);
            return Ok();
        }

        [HttpPut("{id?}")]
        public async Task<IActionResult> Put([FromRoute] int? id, [FromBody] CustomerProductDto customerProductDto)
        {
            await _service.UpdateCustomersProductAsyncId(id, customerProductDto);
            return Ok();
        }

        [HttpDelete("{id?}")]
        public async Task<IActionResult> Delete([FromRoute] int? id)
        {
            await _service.DeleteCustomerProductAsync(id.Value);

            return Ok();
        }

    }
}
