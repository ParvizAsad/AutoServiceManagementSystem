using AutoServiceManagment.DomainModels.DTOs;
using Microsoft.AspNetCore.Mvc;
using AutoServiceManagment.Services.Services.Contracts;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;

namespace AutoServiceManagment.API.Controllers
{
    [EnableCors("AllowCors"), Route("api/[controller]")]
    [ApiController]
    public class FinancesController : ControllerBase
    {
        private readonly IFinanceService _service;

        public FinancesController(IFinanceService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _service.GetAllFinancesAsync());
        }

        [HttpGet("{id?}")]
        public async Task<IActionResult> Get([FromRoute] int? id)
        {
            return Ok(await _service.GetFinanceAsync(id.Value));
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] FinanceDto financeDto)
        {
            await _service.AddFinanceAsync(financeDto);

            return Ok();
        }

        [HttpPut("{id?}")]
        public async Task<IActionResult> Put([FromRoute] int? id, [FromBody] FinanceDto financeDto)
        {
            await _service.UpdateFinanceAsyncId(id, financeDto);

            return Ok();
        }

        [HttpDelete("{id?}")]
        public async Task<IActionResult> Delete([FromRoute] int? id)
        {
            await _service.DeleteFinanceAsync(id.Value);

            return Ok();
        }




    }
}
