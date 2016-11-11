using DDona.KrunkDS.Service;
using Microsoft.Practices.Unity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace DDona.KrunkDS.WebApp.Infrastructure
{
    public class DependencyUnity
    {
        public static void ConfigureDependency(HttpConfiguration config)
        {
            UnityContainer container = new UnityContainer();
            container.RegisterType<IUserService, UserService>(new HierarchicalLifetimeManager());
            container.RegisterType<ICupService, CupService>(new HierarchicalLifetimeManager());
            container.RegisterType<ISettingsService, SettingsService>(new HierarchicalLifetimeManager());

            config.DependencyResolver = new UnityResolver(container);
        }
    }
}