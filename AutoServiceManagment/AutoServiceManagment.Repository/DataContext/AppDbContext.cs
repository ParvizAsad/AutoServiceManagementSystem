using Microsoft.EntityFrameworkCore;
using AutoServiceManagment.DomainModels.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace AutoServiceManagment.Repository.DataContext
{
    public class AppDbContext : IdentityDbContext<User>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }
        public DbSet<Brand> Brands { get; set; }
        public DbSet<CashBox> CashBoxes { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Discount> Discounts { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Finance> Finances { get; set; }
        public DbSet<NonWorkingDetail> NonWorkingDetails { get; set; }
        public DbSet<NonWorkingType> NonWorkingTypes { get; set; }
        public DbSet<Position> Positions { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Salary> Salaries { get; set; }
        public DbSet<Service> Services { get; set; }
        public DbSet<Statistics> Statistics { get; set; }
        public DbSet<Tax> Taxes { get; set; }
        public DbSet<Bio> Bios { get; set; }
        public DbSet<CustomerProduct> CustomerProducts { get; set; }
        public DbSet<CustomerAddServices> CustomerAddServicess { get; set; }
        public DbSet<RegularCustomerPayment> RegularCustomerPayments { get; set; }
        public DbSet<OtherCustomerPayment> OtherCustomerPayments { get; set; }

    }
}
