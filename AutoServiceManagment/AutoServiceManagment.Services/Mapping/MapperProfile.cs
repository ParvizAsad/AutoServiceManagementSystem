﻿

using AutoMapper;
using AutoServiceManagment.DomainModels.DTOs;
using AutoServiceManagment.DomainModels.Entities;

namespace AutoServiceManagment.Services.Mapping
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<Product, ProductDto>().ReverseMap();
            CreateMap<Brand, BrandDto>().ReverseMap();
            CreateMap<CashBox, CashBoxDto>().ReverseMap();
            CreateMap<Category, CategoryDto>().ReverseMap();
            CreateMap<Customer, CustomerDto>().ReverseMap();
            CreateMap<Discount, DiscountDto>().ReverseMap();
            CreateMap<Employee, EmployeeDto>().ReverseMap();
            CreateMap<Finance, FinanceDto>().ReverseMap();
            CreateMap<NonWorkingDetail, NonWorkingDetailDto>().ReverseMap();
            CreateMap<NonWorkingType, NonWorkingTypeDto>().ReverseMap();
            CreateMap<Position, PositionDto>().ReverseMap();
            CreateMap<Product, ProductDto>().ReverseMap();
            CreateMap<Salary, SalaryDto>().ReverseMap();
            CreateMap<Service, ServiceDto>().ReverseMap();
            CreateMap<Tax, TaxDto>().ReverseMap();


        }
    }
}
