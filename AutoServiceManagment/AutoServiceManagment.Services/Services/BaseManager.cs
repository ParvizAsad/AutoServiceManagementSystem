using AutoMapper;
using AutoServiceManagment.Repository.DataContext;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AutoServiceManagment.Services.Services
{
    public abstract class BaseManager
    {
        private protected readonly AppDbContext _dbContext;
        private protected readonly IMapper _mapper;
        private protected readonly LocalizationManager _translation;

        public BaseManager(AppDbContext dataContext, IMapper mapper, LocalizationManager translation)
        {
            _dbContext = dataContext;
            _mapper = mapper;
            _translation = translation;
        }
    }
}
