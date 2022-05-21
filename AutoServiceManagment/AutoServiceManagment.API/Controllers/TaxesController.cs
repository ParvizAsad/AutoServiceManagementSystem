using AutoServiceManagment.DomainModels.DTOs;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using AutoTaxManagment.Service.Services.Contracts;

namespace AutoServiceManagment.API.Controllers
{
    [EnableCors("AllowCors"), Route("api/[controller]")]
    [ApiController]
    public class TaxesController : ControllerBase
    {
        private readonly ITaxService _service;

        public TaxesController(ITaxService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _service.GetAllTaxesAsync());
        }

        [HttpGet("{id?}")]
        public async Task<IActionResult> Get([FromRoute] int? id)
        {
            return Ok(await _service.GetTaxAsync(id.Value));
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] TaxDto taxDto)
        {
            await _service.AddTaxAsync(taxDto);
            return Ok();
        }

        [HttpPut("{id?}")]
        public async Task<IActionResult> Put([FromRoute] int? id, [FromBody] TaxDto taxDto)
        {
            await _service.UpdateTaxAsyncId(id, taxDto);
            return Ok();
        }

        [HttpDelete("{id?}")]
        public async Task<IActionResult> Delete([FromRoute] int? id)
        {
            await _service.DeleteTaxAsync(id.Value);

            return Ok();
        }


    }
}
