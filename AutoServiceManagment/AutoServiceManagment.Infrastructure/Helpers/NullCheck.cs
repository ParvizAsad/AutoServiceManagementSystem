using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AutoServiceManagment.Infrastructure.Helpers
{
    public class NullCheck<T> where T : class
    {
        Task Checking(T entity)
        {
            if(entity == null)

            { throw new Exception($"{entity} not found!"); }

            return Task.CompletedTask;
        }
    }
}
