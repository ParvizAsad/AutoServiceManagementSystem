using AutoServiceManagment.DomainModels.DTOs;
using Microsoft.AspNetCore.Mvc;
using AutoServiceManagment.Services.Services.Contracts;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using OfficeOpenXml.Style;
using OfficeOpenXml;
using System.Drawing;
using System.IO;
using AutoServiceManagment.Repository.DataContext;

using System.Data;
using Microsoft.AspNetCore.Http;
using System.Linq;
using System.Collections.Generic;
using AutoServiceManagment.DomainModels.Entities;
using Microsoft.AspNetCore.StaticFiles;
using OfficeOpenXml.FormulaParsing.Excel.Functions.Math;
using System.Xml.Linq;
using System;

namespace AutoServiceManagment.API.Controllers
{
    [EnableCors("AllowCors"), Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _service;
        private readonly AppDbContext _dbContext;


        public ProductsController(AppDbContext dbContext, IProductService service)
        {
            _dbContext = dbContext;
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _service.GetAllProductsAsync());
        }

        [HttpGet("{id?}")]
        public async Task<IActionResult> Get([FromRoute] int? id)
        {
            return Ok(await _service.GetProductAsync(id.Value));
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ProductDto productDto)
        {
           
            await _service.AddProductAsync(productDto);
            return Ok();
        }

        [HttpPut("{id?}")]
        public async Task<IActionResult> Put([FromRoute] int? id, [FromBody] ProductDto productDto)
        {
            await _service.UpdateProductAsyncId(id, productDto);
            return Ok();
        }

        [HttpDelete("{id?}")]
        public async Task<IActionResult> Delete([FromRoute] int? id)
        {
            await _service.DeleteProductAsync(id.Value);

            return Ok();
        }

        [HttpGet("ExportToExcell")]
        public async Task<IActionResult> ExportToExcell()
        {
            // Get the user list 
            var products = await _service.GetAllProductsAsync();


            var stream = new MemoryStream();
            using (var xlPackage = new ExcelPackage(stream))
            {
                var worksheet = xlPackage.Workbook.Worksheets.Add("Product");
                var namedStyle = xlPackage.Workbook.Styles.CreateNamedStyle("HyperLink");
                namedStyle.Style.Font.UnderLine = true;
                namedStyle.Style.Font.Color.SetColor(Color.Blue);
                const int startRow = 5;
                var row = startRow;

                //Create Headers and format them
                worksheet.Cells["A1"].Value = "Product List";
                using (var r = worksheet.Cells["A1:G1"])
                {
                    r.Merge = true;
                    r.Style.Font.Color.SetColor(Color.White);
                    r.Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.CenterContinuous;
                    r.Style.Fill.PatternType = OfficeOpenXml.Style.ExcelFillStyle.Solid;
                    r.Style.Fill.BackgroundColor.SetColor(Color.FromArgb(23, 55, 93));
                }

                worksheet.Cells["A4"].Value = "Name";
                worksheet.Cells["B4"].Value = "BasePrice";
                worksheet.Cells["C4"].Value = "SalePrice";
                worksheet.Cells["D4"].Value = "Count";
                worksheet.Cells["E4"].Value = "Detail";
                worksheet.Cells["F4"].Value = "Category";
                worksheet.Cells["G4"].Value = "Brand";
                worksheet.Cells["A4:G4"].Style.Fill.PatternType = ExcelFillStyle.Solid;
                worksheet.Cells["A4:G4"].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(184, 204, 228));
                worksheet.Cells["A4:G4"].Style.Font.Bold = true;
                row = 5;
                foreach (var product in products)
                {
                    worksheet.Cells[row, 1].Value = product.Name;
                    worksheet.Cells[row, 2].Value = product.BasePrice;
                    worksheet.Cells[row, 3].Value = product.SalePrice;
                    worksheet.Cells[row, 4].Value = product.Count;
                    worksheet.Cells[row, 5].Value = product.Detail;

                    worksheet.Cells[row, 6].Value  = (await _dbContext.Categories.FindAsync(product.CategoryId)).Name;

                    worksheet.Cells[row, 7].Value = (await _dbContext.Categories.FindAsync(product.BrandId)).Name;

                    row++;
                }

                // set some core property values
                xlPackage.Workbook.Properties.Title = "Product List";
                xlPackage.Workbook.Properties.Author = "Parviz Asadli";
                xlPackage.Workbook.Properties.Subject = "Product List";
                // save the new spreadsheet
                xlPackage.Save();
            }
            stream.Position = 0;
            return File(stream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", DateTime.Now.ToString()+ " Product List.xlsx");

        }

    }
}
