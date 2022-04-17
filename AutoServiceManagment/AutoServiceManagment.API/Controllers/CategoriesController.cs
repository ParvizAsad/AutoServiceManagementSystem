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
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryService _service;

        public CategoriesController(ICategoryService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _service.GetAllCategoriesAsync());
        }

        //[HttpGet("{id?}")]
        //public async Task<IActionResult> Get([FromRoute] int? id)
        //{
        //    return Ok(await _service.GetCategoryAsync(id.Value));
        //}

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CategoryDto categoryDto)
        {
            await _service.AddCategoryAsync(categoryDto);
            return Ok();
        }

        [HttpPut("{id?}")]
        public async Task<IActionResult> Put([FromRoute] int? id, [FromBody] CategoryDto categoryDto)
        {
            await _service.UpdateCategoryAsync(categoryDto);
            return Ok();
        }

        [HttpDelete("{id?}")]
        public async Task<IActionResult> Delete([FromRoute] int? id)
        {
            await _service.DeleteCategoryAsync(id.Value);
            return NoContent();
        }


    }
}
