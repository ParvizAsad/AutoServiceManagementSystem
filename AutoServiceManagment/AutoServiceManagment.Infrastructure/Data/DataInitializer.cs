using AutoServiceManagment.DomainModels.Entities;
using AutoServiceManagment.Repository.DataContext;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AutoServiceManagment.Infrastructure.Data
{
    public class DataInitializer
    {
        public readonly AppDbContext _dbContext;

        public readonly RoleManager<IdentityRole> _roleManager;

        public readonly UserManager<User> _userManager;

        public DataInitializer(AppDbContext dbContext, RoleManager<IdentityRole> roleManager, UserManager<User> userManager)
        {
            _dbContext = dbContext;

            _roleManager = roleManager;

            _userManager = userManager;
        }

        public async Task SeedDataAsync()
        {
            await _dbContext.Database.MigrateAsync();

            var roles = new List<string>()
            {
                RoleConstants.AdminRole,
                RoleConstants.DirectorRole,
                RoleConstants.HRRole,
                RoleConstants.StockerRole,
                RoleConstants.AccountantRole,
                RoleConstants.ReceptionRole,
            };

            foreach (var role in roles)
            {
                if (await _roleManager.RoleExistsAsync(role))

                    continue;

                await _roleManager.CreateAsync(new IdentityRole(role));
            }

            var userAdmin = new User
            {
                FullName = "Admin Admin",
                UserName = "Admin",
                Email = "admin@gmail.com",
            };

            var userDirector = new User
            {
                FullName = "userDirector userDirector",
                UserName = "userDirector",
                Email = "director@gmail.com",
            };

            var userHR = new User
            {
                FullName = "HR HR",
                UserName = "HR",
                Email = "HR@gmail.com",
            };

            var userStocker = new User
            {
                FullName = "Stocker Stocker",
                UserName = "Stocker",
                Email = "Stocker@gmail.com",
            };

            var userAccountant = new User
            {
                FullName = "Accountant Accountant",
                UserName = "Accountant",
                Email = "Accountant@gmail.com",
            };

            var userReception = new User
            {
                FullName = "Reception Reception",
                UserName = "Reception",
                Email = "Reception@gmail.com",
            };

            if (await _userManager.FindByNameAsync(userAdmin.UserName) != null)
                return;

            if (await _userManager.FindByNameAsync(userDirector.UserName) != null)
                return;

            if (await _userManager.FindByNameAsync(userHR.UserName) != null)
                return;
            
            if (await _userManager.FindByNameAsync(userStocker.UserName) != null)
                return;

            if (await _userManager.FindByNameAsync(userAccountant.UserName) != null)
                return;
            
            if (await _userManager.FindByNameAsync(userReception.UserName) != null)
                return;

            await _userManager.CreateAsync(userAdmin, "Admin748159263@");
            await _userManager.AddToRoleAsync(userAdmin, RoleConstants.AdminRole);

            await _userManager.CreateAsync(userDirector, "Director748159263@");
            await _userManager.AddToRoleAsync(userDirector, RoleConstants.DirectorRole);

            await _userManager.CreateAsync(userHR, "HR748159263@");
            await _userManager.AddToRoleAsync(userHR, RoleConstants.HRRole);
            
            await _userManager.CreateAsync(userStocker, "Stocker748159263@");
            await _userManager.AddToRoleAsync(userStocker, RoleConstants.StockerRole); 
            
            await _userManager.CreateAsync(userAccountant, "Accountant748159263@");
            await _userManager.AddToRoleAsync(userAccountant, RoleConstants.AccountantRole); 
            
            await _userManager.CreateAsync(userReception, "reception748159263@");
            await _userManager.AddToRoleAsync(userReception, RoleConstants.ReceptionRole);
            
        }
    }
}
