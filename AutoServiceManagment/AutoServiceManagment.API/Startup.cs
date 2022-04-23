using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoServiceManagment.Repository.DataContext;
using AutoServiceManagment.Services.Mapping;
using AutoServiceManagment.Repository.Repository.Contracts;
using AutoServiceManagment.Repository.Repository;
using AutoServiceManagment.Services.Services.Contracts;
using AutoServiceManagment.Services.Services;
using Microsoft.EntityFrameworkCore;
using AutoServiceManagment.Infrastructure.Middlewares;
using AutoTaxManagment.Service.Services.Contracts;

namespace AutoServiceManagment.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            var connectionString = Configuration.GetConnectionString("DefaultConnection");

            services.AddDbContext<AppDbContext>(options =>
            {
                options.UseSqlServer(connectionString, builder =>
                {
                    builder.MigrationsAssembly("AutoServiceManagment.Repository");
                });
            });

            services.AddAutoMapper(typeof(MapperProfile));

            services.AddScoped(typeof(IRepository<>), typeof(EfCoreRepository<>));
            services.AddScoped<ISalaryService, SalaryService>();
            services.AddScoped<IProductService, ProductService>();
            services.AddScoped<IBrandService, BrandService>();
            services.AddScoped<ICashBoxService, CashBoxService>();
            services.AddScoped<ICategoryService, CategoryService>();
            services.AddScoped<ICustomerService, CustomerService>();
            services.AddScoped<IDiscountService, DiscountService>();
            services.AddScoped<IEmployeeService, EmployeeService>();
            services.AddScoped<IFinanceService, FinanceService>();
            services.AddScoped<INonWorkingDetailService, NonWorkingDetailService>();
            services.AddScoped<INonWorkingTypeService, NonWorkingTypeService>();
            services.AddScoped<IPositionService, PositionService>();
            services.AddScoped<IProductService, ProductService>();
            services.AddScoped<IServiceService, ServiceService>();
            services.AddScoped<ITaxService, TaxService>();


            services.AddCors(
                options => options.AddPolicy("AllowCors",
                     builder =>
                     {
                         builder.AllowAnyOrigin()
                                 .WithMethods("GET", "PUT", "POST", "DELETE")
                                 .AllowAnyHeader();
                     })
             );

            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "AutoServiceManagment.API", Version = "v1" });
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "AutoServiceManagment.API v1"));
            }

            app.UseHttpsRedirection();
            app.ConfigureExceptionHandler();

            app.UseRouting();

            app.UseAuthorization();
            app.UseCors("AllowCors");


            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
