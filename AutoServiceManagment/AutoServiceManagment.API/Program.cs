using AutoServiceManagment.DomainModels.Entities;
using AutoServiceManagment.Repository.Data;
using AutoServiceManagment.Repository.DataContext;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Serilog;
using Serilog.Events;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Identity;

namespace AutoServiceManagment.API
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
         

            Log.Logger = new LoggerConfiguration()
                  .MinimumLevel.Override("Microsoft", LogEventLevel.Information)
                  .Enrich.FromLogContext()
                  .WriteTo.File(
                      System.IO.Path.Combine("D:\\LogFiles", "AutoService", "diagnostics.txt"),
                      rollingInterval: RollingInterval.Day,
                      fileSizeLimitBytes: 10 * 1024 * 1024,
                      retainedFileCountLimit: 30,
                      rollOnFileSizeLimit: true,
                      shared: true,
                      flushToDiskInterval: TimeSpan.FromSeconds(2))
                  .WriteTo.Console()
                  .CreateLogger();

            try
            {
                Log.Information("Starting web host");
                //CreateHostBuilder(args).Build().Run();
                var host = CreateHostBuilder(args).Build();

                using (var scope = host.Services.CreateScope())
                {
                    var appDbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
                    var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
                    var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();

                    var dataInitializer = new DataInitializer(appDbContext, roleManager, userManager);
                    await dataInitializer.SeedDataAsync();
                }

                await host.RunAsync();

            }
            catch (Exception ex)
            {
                Log.Fatal(ex, "Host terminated unexpectedly");
            }
            finally
            {
                Log.CloseAndFlush();
            }

        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .UseSerilog()
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
