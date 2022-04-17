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
    public class BrandsController : ControllerBase
    {
        private readonly IBrandService _service;

        public BrandsController(IBrandService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _service.GetAllBrandsAsync());
        }

        //[HttpGet("{id?}")]
        //public async Task<IActionResult> Get([FromRoute] int? id)
        //{
        //    return Ok(await _service.GetBrandAsync(id.Value));
        //}

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] BrandDto brandDto)
        {
            await _service.AddBrandAsync(brandDto);
            return Ok();

        }

        [HttpPut("{id?}")]
        public async Task<IActionResult> Put([FromRoute] int? id, [FromBody] BrandDto brandDto)
        {
            await _service.UpdateBrandAsync(brandDto);
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
