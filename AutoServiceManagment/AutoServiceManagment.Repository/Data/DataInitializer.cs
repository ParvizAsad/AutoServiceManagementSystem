using AutoServiceManagment.DomainModels.Entities;
using AutoServiceManagment.Repository.DataContext;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AutoServiceManagment.Repository.Data
{
    public class DataInitializer
    {
        private readonly AppDbContext _dbContext;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly UserManager<User> _userManager;

        public DataInitializer(AppDbContext dbContext, RoleManager<IdentityRole> roleManager, UserManager<User> userManager)
        {
            _dbContext = dbContext;
            _roleManager = roleManager;
            _userManager = userManager;
        }

        public async Task SeedDataAsync()
        {
            await _dbContext.Database.MigrateAsync();

            var roles = new List<string>
            {
                RoleConstants.AdminRole,
                RoleConstants.HrRole,
                RoleConstants.ReceptionRole,
                RoleConstants.FinanceRole,
                RoleConstants.DirectorRole,
                RoleConstants.StockRole,
                RoleConstants.UserRole
            };

            foreach (var role in roles)
            {
                if (await _roleManager.RoleExistsAsync(role))
                    continue;

                await _roleManager.CreateAsync(new IdentityRole(role));
            }

            var user = new User
            {
                FullName = "Admin Admin",
                UserName = "Admin",
                Email = "Admin@Admin.az",
            };

            if (await _userManager.FindByNameAsync(user.UserName) != null)
                return;

            await _userManager.CreateAsync(user, "Admin.123");
            await _userManager.AddToRoleAsync(user, RoleConstants.AdminRole);
        }
    }
}
