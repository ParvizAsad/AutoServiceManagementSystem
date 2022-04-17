using AutoMapper;
using AutoServiceManagment.DomainModels.DTOs;
using AutoServiceManagment.DomainModels.Entities;
using AutoServiceManagment.Repository.DataContext;
using AutoServiceManagment.Repository.Repository;
using AutoServiceManagment.Repository.Repository.Contracts;
using AutoServiceManagment.Services.Services.Contracts;
using AutoTaxManagment.Service.Services.Contracts;
using System.Collections.Generic;
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
            var taxes = await GetAllAsync();
            return _mapper.Map<List<TaxDto>>(taxes);
        }

        public async Task<TaxDto> GetTaxAsync(int id)
        {
            var tax = await GetAsync(id);

            return _mapper.Map<TaxDto>(tax);
        }
        public async Task AddTaxAsync(TaxDto taxDto)
        {
            var tax = _mapper.Map<Tax>(taxDto);
            await _repository.AddAsync(tax);
        }

        public async Task DeleteTaxAsync(int? id)
        {
            var tax = await _repository.GetAsync(id.Value);

            tax.IsDeleted = true;
        }
        public Task UpdateTaxAsync(TaxDto taxDto)
        {
            throw new System.NotImplementedException();
        }
    }
}
