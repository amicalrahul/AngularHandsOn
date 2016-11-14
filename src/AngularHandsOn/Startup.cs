using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using AngularHandsOn.Entities;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Serialization;
using Microsoft.AspNetCore.Mvc.Formatters;
using AngularHandsOn.Repositories;
using AutoMapper;
using AngularHandsOn.Model;
using Newtonsoft.Json;
using System.Buffers;

namespace AngularHandsOn
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            services.AddMvc()
            //    (options =>
            //{
            //    options.OutputFormatters.Clear();
            //    options.OutputFormatters.Add(new JsonOutputFormatter(new JsonSerializerSettings()
            //    {
            //        ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
            //    }, ArrayPool<char>.Shared));
            //})
                //.AddMvcOptions(o =>
                //{
                //    o.OutputFormatters.Add(new XmlDataContractSerializerOutputFormatter());
                //})
            .AddJsonOptions(o =>
            {
                if (o.SerializerSettings != null)
                {
                    o.SerializerSettings.ContractResolver = new DefaultContractResolver();
                    var conResolver = o.SerializerSettings.ContractResolver as DefaultContractResolver;
                    o.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                    //conResolver.NamingStrategy = new NamingStrategy()
                }
            });
            services.AddDbContext<AngularDbContext>(options =>
                                    options.UseSqlServer(Configuration.GetConnectionString("AngularHandsOnConnection")));
            services.AddTransient<Seeder>();
            services.AddSingleton<ISchoolRepository<int>, SchoolRepository>();
            services.AddSingleton<IClassroomRepository<int>, ClassroomRepository>();
            services.AddSingleton<IActivityRepository<int>, ActivityRepository >();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory, Seeder seeder)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseBrowserLink();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }
            app.UseStatusCodePages();
            app.UseFileServer();

            Mapper.Initialize(cfg => {
                cfg.CreateMap<SchoolModel, School>().ReverseMap();
                cfg.CreateMap<ClassroomModel, Classroom>().ReverseMap();
                cfg.CreateMap<ActivityModel, Activity>().ReverseMap();
            });

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action}/{id?}",
                    defaults: new { controller = "Home", action = "ProductManagement" });
            });
            seeder.EnsureSeedData().Wait();
        }
    }
}
