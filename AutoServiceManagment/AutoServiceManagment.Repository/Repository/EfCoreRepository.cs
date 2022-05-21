using AutoServiceManagment.Repository.DataContext;
using AutoServiceManagment.Repository.Repository.Contracts;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoServiceManagment.Base;
using Microsoft.EntityFrameworkCore;


namespace AutoServiceManagment.Repository.Repository
{
    public class EfCoreRepository<T> : IRepository<T> where T : class, IEntity
    {
        protected readonly AppDbContext DbContext;

        public EfCoreRepository(AppDbContext dbContext)
        {
            DbContext = dbContext;
        }

        public async Task<IList<T>> GetAllAsync()
        {
            return await DbContext.Set<T>().ToListAsync();
        }

        public async Task<T> GetAsync(int id)
        {
            return await DbContext.Set<T>().AsNoTracking().FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task AddAsync(T entity)
        {
            await DbContext.Set<T>().AddAsync(entity);
            await DbContext.SaveChangesAsync();
        }

        public async Task AddAsync(IEnumerable<T> entity)
        {
            foreach (var item in entity)
            {
                await DbContext.Set<T>().AddAsync(item);
                await DbContext.SaveChangesAsync();
            }
        }

        public async Task AddAsync(params T[] entity)
        {
            foreach (var item in entity)
            {
                await DbContext.Set<T>().AddAsync(item);
                await DbContext.SaveChangesAsync();
            }
        }

        public async Task DeleteAsync(T entity)
        {
            DbContext.Set<T>().Remove(entity);
            await DbContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(IEnumerable<T> entity)
        {
            foreach (var item in entity)
            {
                DbContext.Set<T>().Remove(item);
                await DbContext.SaveChangesAsync();
            }
        }

        public async Task DeleteAsync(params T[] entity)
        {
            foreach (var item in entity)
            {
                DbContext.Set<T>().Remove(item);
                await DbContext.SaveChangesAsync();
            }
        }

        public async Task UpdateAsync(T entity)
        {
            DbContext.Set<T>().Update(entity);
            await DbContext.SaveChangesAsync();
        }

        public async Task UpdateAsync(IEnumerable<T> entity)
        {
            foreach (var item in entity)
            {
                DbContext.Set<T>().Update(item);
                await DbContext.SaveChangesAsync();
            }
        }

        public async Task UpdateAsync(params T[] entity)
        {
            foreach (var item in entity)
            {
                DbContext.Set<T>().Update(item);
                await DbContext.SaveChangesAsync();
            }
        }

        public Task GetAsync(object value)
        {
            throw new System.NotImplementedException();
        }
    }
}
