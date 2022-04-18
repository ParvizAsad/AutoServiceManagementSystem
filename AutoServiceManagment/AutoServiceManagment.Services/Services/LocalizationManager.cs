using AutoServiceManagment.Services.Resources;
using Microsoft.Extensions.Localization;
using System.Collections.Generic;
using System.Reflection;

namespace AutoServiceManagment.Services.Services
{
    public class LocalizationManager
    {
        public readonly IStringLocalizer _localizer;
        public readonly IStringLocalizer _localizerHome;
        public readonly IStringLocalizer _localizerAdmin;

        public LocalizationManager(IStringLocalizerFactory factory)
        {
            var type = typeof(StaticResource);
            var assemblyName = new AssemblyName(type.GetTypeInfo().Assembly.FullName);

            _localizer = factory.Create("StaticResource", assemblyName.Name);
            _localizerHome = factory.Create("HomeResource", assemblyName.Name);
            _localizerAdmin = factory.Create("AdminResource", assemblyName.Name);
        }

        public string this[string key] => _localizer[key];

        private IEnumerable<LocalizedString> GetAllStaticResource() => _localizer.GetAllStrings();
        public IEnumerable<LocalizedString> GetAllHomeResource() => _localizerHome.GetAllStrings();
        public IEnumerable<LocalizedString> GetAllAdminResource() => _localizerAdmin.GetAllStrings();

    }
}
