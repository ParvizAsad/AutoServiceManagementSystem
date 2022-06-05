using AutoServiceManagment.DomainModels.DTOs;
using AutoServiceManagment.Services.Services.Contracts;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace AutoServiceManagment.API.Controllers
{
    [EnableCors("AllowCors"), Route("api/[controller]")]
    [ApiController]
    public class RegularCustomerPaymentController : ControllerBase
    {
        private readonly IRegularCustomerPaymentService _service;

        public RegularCustomerPaymentController(IRegularCustomerPaymentService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _service.GetAllregularCustomerPaymentDtoAsync());
        }

        [HttpGet("{id?}")]
        public async Task<IActionResult> Get([FromRoute] int? id)
        {
            return Ok(await _service.GetRegularCustomerPaymentAsync(id.Value));
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] RegularCustomerPaymentDto regularCustomerPaymentDto)
        {
            await _service.AddRegularCustomerPaymentAsync(regularCustomerPaymentDto);
            return Ok();
        }

        [HttpPut("{id?}")]
        public async Task<IActionResult> Put([FromRoute] int? id, [FromBody] RegularCustomerPaymentDto regularCustomerPaymentDto)
        {
            await _service.UpdateRegularCustomerPaymentAsyncId(id, regularCustomerPaymentDto);
            return Ok();
        }

        [HttpDelete("{id?}")]
        public async Task<IActionResult> Delete([FromRoute] int? id)
        {
            await _service.DeleteRegularCustomerPaymentAsync(id.Value);
            return Ok();
        }

    }
}
