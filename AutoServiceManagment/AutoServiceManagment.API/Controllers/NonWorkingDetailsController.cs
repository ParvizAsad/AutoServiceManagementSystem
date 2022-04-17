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
    public class NonWorkingDetailsController : ControllerBase
    {
        private readonly INonWorkingDetailService _service;

        public NonWorkingDetailsController(INonWorkingDetailService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _service.GetAllNonWorkingDetailsAsync());
        }

        //[HttpGet("{id?}")]
        //public async Task<IActionResult> Get([FromRoute] int? id)
        //{
        //    return Ok(await _service.GetNonWorkingDetailAsync(id.Value));
        //}

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] NonWorkingDetailDto nonWorkingDetailDto)
        {
            await _service.AddNonWorkingDetailAsync(nonWorkingDetailDto);
            return Ok();
        }

        [HttpPut("{id?}")]
        public async Task<IActionResult> Put([FromRoute] int? id, [FromBody] NonWorkingDetailDto nonWorkingDetailDto)
        {
            await _service.UpdateNonWorkingDetailAsync(nonWorkingDetailDto);
            return Ok();
        }

        [HttpDelete("{id?}")]
        public async Task<IActionResult> Delete([FromRoute] int? id)
        {
            await _service.DeleteNonWorkingDetailAsync(id.Value);
            return NoContent();
        }
    }
}
