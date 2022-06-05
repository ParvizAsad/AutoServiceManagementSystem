using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using AutoServiceManagment.Services.Services.Contracts;
using System.Threading.Tasks;
using AutoServiceManagment.DomainModels.DTOs;

namespace AutoServiceManagment.API.Controllers
{
    [EnableCors("AllowCors"), Route("api/[controller]")]
    [ApiController]
    public class OtherCustomerPaymentController : ControllerBase
    {
        private readonly IOtherCustomerPaymentService _service;

        public OtherCustomerPaymentController(IOtherCustomerPaymentService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _service.GetAllOtherCustomerPaymentDtoAsync());
        }

        [HttpGet("{id?}")]
        public async Task<IActionResult> Get([FromRoute] int? id)
        {
            return Ok(await _service.GetOtherCustomerPaymentAsync(id.Value));
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] OtherCustomerPaymentDto otherCustomerPaymentDto)
        {
            await _service.AddOtherCustomerPaymentAsync(otherCustomerPaymentDto);
            return Ok();
        }

        [HttpPut("{id?}")]
        public async Task<IActionResult> Put([FromRoute] int? id, [FromBody] OtherCustomerPaymentDto otherCustomerPaymentDto)
        {
            await _service.UpdateOtherCustomerPaymentAsyncId(id, otherCustomerPaymentDto);
            return Ok();
        }

        [HttpDelete("{id?}")]
        public async Task<IActionResult> Delete([FromRoute] int? id)
        {
            await _service.DeleteOtherCustomerPaymentAsync(id.Value);
            return Ok();
        }

    }
}
