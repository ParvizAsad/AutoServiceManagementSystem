using AutoServiceManagment.DomainModels.DTOs;
using Microsoft.AspNetCore.Mvc;
using AutoServiceManagment.Services.Services.Contracts;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;

namespace AutoServiceManagment.API.Controllers
{
    [EnableCors("AllowCors"), Route("api/[controller]")]
    [ApiController]
    public class CashBoxesController : ControllerBase
    {
        private readonly ICashBoxService _service;

        public CashBoxesController(ICashBoxService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _service.GetAllCashBoxesAsync());
        }

        [HttpGet("{id?}")]
        public async Task<IActionResult> Get([FromRoute] int? id)
        {
            return Ok(await _service.GetCashBoxAsync(id.Value));
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CashBoxDto cashBoxDto)
        {
            await _service.AddCashBoxAsync(cashBoxDto);
            return Ok();
        }

        [HttpPut("{id?}")]
        public async Task<IActionResult> Put([FromRoute] int? id, [FromBody] CashBoxDto cashBoxDto)
        {
            await _service.UpdateCashBoxAsyncId(id, cashBoxDto);
            return Ok();
        }

        [HttpDelete("{id?}")]
        public async Task<IActionResult> Delete([FromRoute] int? id)
        {
            await _service.DeleteCashBoxAsync(id.Value);
            return Ok();
        }

    }
}
