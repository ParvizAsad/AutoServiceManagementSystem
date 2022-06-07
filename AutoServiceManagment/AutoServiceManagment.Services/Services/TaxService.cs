using AutoMapper;
using AutoServiceManagment.DomainModels.DTOs;
using AutoServiceManagment.DomainModels.Entities;
using AutoServiceManagment.Infrastructure.Helpers;
using AutoServiceManagment.Repository.DataContext;
using AutoServiceManagment.Repository.Repository;
using AutoServiceManagment.Repository.Repository.Contracts;
using AutoTaxManagment.Service.Services.Contracts;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AutoServiceManagment.Services.Services
{
    public class TaxService : EfCoreRepository<Tax>, ITaxService
    {
        private readonly IMapper _mapper;
        private readonly IRepository<Tax> _repository;

        public TaxService(AppDbContext dbContext, IMapper mapper, IRepository<Tax> repository) : base(dbContext)
        {
            _mapper = mapper;
            _repository = repository;
        }

        public async Task<IList<TaxDto>> GetAllTaxesAsync()
        {

            var taxes = await DbContext.Taxes.Where(x => x.IsDeleted == false).ToListAsync();
            return _mapper.Map<List<TaxDto>>(taxes);
        }

        public async Task<TaxDto> GetTaxAsync(int id)
        {
            var tax = await GetAsync(id);

            return _mapper.Map<TaxDto>(tax);
        }
        public async Task AddTaxAsync(TaxDto taxDto)
        {
            var existTax = await DbContext.Taxes.Where(x => x.Name == taxDto.Name).FirstOrDefaultAsync();

            await NullCheck<Tax>.Checking(existTax);

            var tax = _mapper.Map<Tax>(taxDto);
            await _repository.AddAsync(tax);
        }

        public async Task DeleteTaxAsync(int? id)
        {
            var tax = await DbContext.Taxes.FirstOrDefaultAsync(x => x.Id == id && x.IsDeleted != true);

            if (tax == null) { throw new Exception("Tax not found!"); }

            tax.IsDeleted = true;

            await DbContext.SaveChangesAsync();
        }

        public async Task UpdateTaxAsyncId(int? id, TaxDto taxDto)
        {
            var tax = await DbContext.Taxes.FirstOrDefaultAsync(x => x.Id == id && x.IsDeleted != true);

            if (tax == null) { throw new Exception("Tax not found!"); }

            tax.Name = taxDto.Name;
            tax.TaxValue = taxDto.TaxValue;
            DbContext.Taxes.Update(tax);

            await DbContext.SaveChangesAsync();
        }
    }
}
