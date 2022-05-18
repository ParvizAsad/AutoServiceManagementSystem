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
using AutoServiceManagment.AuthenticationService.Models;

using System.Text.Json.Serialization;
using AutoTaxManagment.Service.Services.Contracts;
using AutoServiceManagment.AuthenticationService.Contracts;
using AutoServiceManagment.AuthenticationService;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using AutoServiceManagment.DomainModels.Entities;
using Microsoft.AspNetCore.Identity;

namespace AutoServiceManagment.API
{
    public class Startup
    {
        public IConfiguration Configuration { get; }
        private readonly IWebHostEnvironment _environment;

        public Startup(IConfiguration configuration, IWebHostEnvironment environment)
        {
            Configuration = configuration;
            _environment = environment;
        }


        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<JwtSetting>(Configuration.GetSection("JWT"));
            var connectionString = Configuration.GetConnectionString("DefaultConnection");

            services.AddDbContext<AppDbContext>(options =>
            {
                options.UseSqlServer(connectionString, builder =>
                {
                    builder.MigrationsAssembly("AutoServiceManagment.Repository");
                });
            });

            services.AddAutoMapper(typeof(MapperProfile));
            services.AddIdentity<User, IdentityRole>(options =>
            {
                options.User.RequireUniqueEmail = true;

                options.Lockout.AllowedForNewUsers = true;
                options.Lockout.MaxFailedAccessAttempts = 3;
                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);

                options.Password.RequiredLength = 8;
                options.Password.RequireUppercase = true;
                options.Password.RequireLowercase = true;
                options.Password.RequireNonAlphanumeric = true;
                options.Password.RequireDigit = true;
            }).AddEntityFrameworkStores<AppDbContext>().AddDefaultTokenProviders();

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
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IStatisticsService, StatisticsService>();

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
                .AddJwtBearer(o =>
                {
                    o.RequireHttpsMetadata = false;
                    o.SaveToken = false;
                    o.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ClockSkew = TimeSpan.Zero,
                        ValidIssuer = Configuration["JWT:Issuer"],
                        ValidAudience = Configuration["JWT:Audience"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["JWT:Key"]))
                    };
                });
            services.AddCors(
                options => options.AddPolicy("AllowCors",
                     builder =>
                     {
                         builder.AllowAnyOrigin()
                                 .WithMethods("GET", "PUT", "POST", "DELETE")
                                 .AllowAnyHeader();
                     })
             );

            //            services.AddControllersWithViews()
            //    .AddNewtonsoftJson(options =>
            //    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
            //);

            //         services.AddControllers().AddJsonOptions(x =>
            //x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve);

            services.AddControllers();
            //.AddNewtonsoftJson();
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

            app.UseAuthentication();
            app.UseAuthorization();
            app.UseCors("AllowCors");


            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
