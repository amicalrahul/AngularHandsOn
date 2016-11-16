using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using AngularHandsOn.Entities;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Serialization;
using AngularHandsOn.Repositories;
using AutoMapper;
using AngularHandsOn.Model;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System;
using Microsoft.AspNetCore.Mvc;

namespace AngularHandsOn
{
    public partial class Startup
    {
        private IHostingEnvironment _env;

        public Startup(IHostingEnvironment env)
        {
            _env = env;
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
            services.AddIdentity<User, IdentityRole>().AddEntityFrameworkStores<AngularDbContext>().AddDefaultTokenProviders();
            services.Configure<IdentityOptions>(options =>
            {
                // Password settings
                options.Password.RequireDigit = true;
                options.Password.RequiredLength = 8;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = true;
                options.Password.RequireLowercase = false;

                // Lockout settings
                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(30);
                options.Lockout.MaxFailedAccessAttempts = 10;

                // Cookie settings
                options.Cookies.ApplicationCookie.ExpireTimeSpan = TimeSpan.FromDays(150);
                options.Cookies.ApplicationCookie.LoginPath = "/Auth/LogIn";
                options.Cookies.ApplicationCookie.LogoutPath = "/Auth/LogOff";

                // User settings
                options.User.RequireUniqueEmail = true;
            });
            // Add framework services.
            services.AddMvc(config =>
            {
                if (_env.IsProduction())
                    config.Filters.Add(new RequireHttpsAttribute());
            })
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

            ConfigureAuth(app);

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
            app.UseIdentity();
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
