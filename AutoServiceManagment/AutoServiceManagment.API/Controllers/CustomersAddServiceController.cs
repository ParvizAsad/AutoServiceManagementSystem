using AutoServiceManagment.DomainModels.DTOs;
using Microsoft.AspNetCore.Mvc;
using AutoServiceManagment.Services.Services.Contracts;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;

namespace AutoServiceManagment.API.Controllers
{
    [EnableCors("AllowCors"), Route("api/[controller]")]
    [ApiController]
    public class CustomersAddServiceController : ControllerBase
    {

        private readonly ICustomerAddServiceService _service;

        public CustomersAddServiceController(ICustomerAddServiceService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _service.GetAllCustomersAddServiceAsync());
        }

        [HttpGet("{id?}")]
        public async Task<IActionResult> Get([FromRoute] int? id)
        {
            return Ok(await _service.GetCustomersAddServiceAsync(id.Value));
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CustomerAddServiceDto customerAddServiceDto)
        {
            await _service.AddCustomersAddServiceAsync(customerAddServiceDto);
            return Ok();
        }

        [HttpPut("{id?}")]
        public async Task<IActionResult> Put([FromRoute] int? id, [FromBody] CustomerAddServiceDto customerAddServiceDto)
        {
            await _service.UpdateCustomersAddServiceAsyncId(id, customerAddServiceDto);
            return Ok();
        }

        [HttpDelete("{id?}")]
        public async Task<IActionResult> Delete([FromRoute] int? id)
        {
            await _service.DeleteCustomersAddServiceAsync(id.Value);

            return Ok();
        }



    }
}
