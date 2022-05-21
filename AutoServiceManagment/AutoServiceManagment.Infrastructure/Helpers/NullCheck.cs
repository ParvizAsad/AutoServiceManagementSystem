using AutoServiceManagment.DomainModels.Entities;
using System;
using System.Threading.Tasks;

namespace AutoServiceManagment.Infrastructure.Helpers
{
    public static class NullCheck<T> where T : class
    {
       public static Task Checking(T entity)
        {
            if(entity != null)

            { throw new Exception($"{entity} exist with this name!"); }

            return Task.CompletedTask;
        }
    }
}
