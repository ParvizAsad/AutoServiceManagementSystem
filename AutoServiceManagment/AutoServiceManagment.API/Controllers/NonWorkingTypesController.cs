﻿using AutoMapper;
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
    public class NonWorkingTypesController : ControllerBase
    {
        private readonly INonWorkingTypeService _service;

        public NonWorkingTypesController(INonWorkingTypeService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _service.GetAllNonWorkingTypesAsync());
        }

        //[HttpGet("{id?}")]
        //public async Task<IActionResult> Get([FromRoute] int? id)
        //{
        //    return Ok(await _service.GetNonWorkingTypeAsync(id.Value));
        //}

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] NonWorkingTypeDto nonWorkingTypeDto)
        {
            await _service.AddNonWorkingTypeAsync(nonWorkingTypeDto);
            return Ok();
        }

        [HttpPut("{id?}")]
        public async Task<IActionResult> Put([FromRoute] int? id, [FromBody] NonWorkingTypeDto nonWorkingTypeDto)
        {
            await _service.UpdateNonWorkingTypeAsync(nonWorkingTypeDto);
            return Ok();
        }

        [HttpDelete("{id?}")]
        public async Task<IActionResult> Delete([FromRoute] int? id)
        {
            await _service.DeleteNonWorkingTypeAsync(id.Value);
            return NoContent();
        }
    }
}
