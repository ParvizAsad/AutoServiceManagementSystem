using AutoServiceManagment.DomainModels.DTOs;
using Microsoft.AspNetCore.Mvc;
using AutoServiceManagment.Services.Services.Contracts;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Authorization;

namespace AutoServiceManagment.API.Controllers
{
    //[Authorize]
    [EnableCors("AllowCors"), Route("api/[controller]")]
    [ApiController]
    public class BrandsController : ControllerBase
    {
        private readonly IBrandService _service;

        public BrandsController(IBrandService service)
        {
            _service = service;
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            //var user = HttpContext.User;
            return Ok(await _service.GetAllBrandsAsync());
        }
        
        //[Authorize]
        [HttpGet("{id?}")]
        public async Task<IActionResult> Get([FromRoute] int? id)
        {
            return Ok(await _service.GetBrandAsync(id.Value));
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] BrandDto brandDto)
        {
            await _service.AddBrandAsync(brandDto);
            return Ok();
        }

        [HttpPut("{id?}")]
        public async Task<IActionResult> Put([FromRoute] int? id, [FromBody] BrandDto brandDto)
        {
            await _service.UpdateBrandAsyncId(id, brandDto);
            return Ok();
        }

        [HttpDelete("{id?}")]
        public async Task<IActionResult> Delete([FromRoute] int? id)
        {
            await _service.DeleteBrandAsync(id.Value);

            return Ok();
        }

    }
}
