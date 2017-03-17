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
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Threading.Tasks;
using AngularHandsOn.Middlewares;
using AngularHandsOn.Filters;
using System.Text;
using Microsoft.IdentityModel.Tokens;

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
            if (env.IsDevelopment())
            {
                // For more details on using the user secret store see http://go.microsoft.com/fwlink/?LinkID=532709
                builder.AddUserSecrets();
            }
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSwaggerGen();
            services.AddSingleton(Configuration);
            #region Identity Setup
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
                options.Cookies.ApplicationCookie.Events = new CookieAuthenticationEvents()
                {
                    OnRedirectToLogin = async cxt =>
                    {
                        if (cxt.Request.Path.StartsWithSegments("/api") && cxt.Response.StatusCode == 200)
                        {
                            cxt.Response.StatusCode = 401;
                        }
                        else
                        {
                            cxt.Response.Redirect(cxt.RedirectUri);
                        }
                        await Task.Yield();
                    }
                };


                // User settings
                options.User.RequireUniqueEmail = true;
            });
            #endregion
            services.AddDistributedMemoryCache();

            services.AddSession(options =>
            {
                options.IdleTimeout = TimeSpan.FromMinutes(5);
            });
            // Add framework services.
            #region Add MVC and define its options
            services.AddMvc(config =>
                {
                    if (_env.IsProduction())
                        config.Filters.Add(new RequireHttpsAttribute());
                    //Add the filters here if you want this to be executed for every controller
                    // else define the filter as attrinute to specific controller
                    // as I don't want UnitOfWorkFilter to be executed for all controller so commenting this line
                    //config.Filters.AddService(typeof(UnitOfWorkFilter));
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
                }).
                AddFeatureFolders();
            #endregion

            services.AddCors((cfg) =>
           {
               cfg.AddPolicy("rahul", bldr =>
               {
                   bldr.AllowAnyHeader()
                   .AllowAnyMethod()
                   .WithOrigins("http://rahul.com");
               });
               cfg.AddPolicy("AnyGet", bldr =>
               {
                   bldr.AllowAnyHeader()
                   .WithMethods("GET")
                   .AllowAnyOrigin();
               });
           });
            services.AddAutoMapper();
            services.AddScoped<UnitOfWorkFilter>();
            services.AddDbContext<AngularDbContext>(options =>
                                    options.UseSqlServer(Configuration.GetConnectionString("AngularHandsOnConnection")));            
            services.AddTransient<Seeder>();
            services.AddScoped<ISchoolRepository<int>, SchoolRepository>();
            services.AddScoped<IClassroomRepository<int>, ClassroomRepository>();
            services.AddScoped<IActivityRepository<int>, ActivityRepository>();
            services.AddScoped<IProductRepository<string>, ProductRepository>();
            services.AddScoped<IBookRepository<int>, BookRepository>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory, Seeder seeder)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();
            app.UseSwagger();
            app.UseSwaggerUi();
            //Adding ConfigureAuth middleware enables token authenticaion for API calls
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
            app.UseSession();

            #region Automapper Mappings Defined
            Mapper.Initialize(cfg =>
                {
                    cfg.CreateMap<SchoolModel, School>().ReverseMap();
                    cfg.CreateMap<ClassroomModel, Classroom>().ReverseMap();
                    cfg.CreateMap<ActivityModel, Activity>().ReverseMap();
                    cfg.CreateMap<BookModel, Books>().ReverseMap();
                    cfg.CreateMap<ProductModel, Product>()
                        .ForMember(dest => dest.Tags,
                            opt => opt.ResolveUsing((src, dest, unused, cxt) =>
                            {
                                return ConvertArrayToString(src.Tags);
                            }))
                    .ReverseMap()
                        .ForMember(dest => dest.Tags,
                            opt => opt.MapFrom
                            (src => ConvertStringToArray(src.Tags)));
                }); 
            #endregion

            app.UseIdentity();
            app.UseFacebookAuthentication(new FacebookOptions()
            {
                AppId = Configuration["Authentication:Facebook:AppId"],
                AppSecret = Configuration["Authentication:Facebook:AppSecret"]
            });

            #region JWT Middleware
            app.UseJwtBearerAuthentication(new JwtBearerOptions()
            {
                AutomaticAuthenticate = true,
                AutomaticChallenge = true,
                TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidIssuer = Configuration["Tokens:Issuer"],
                    ValidAudience = Configuration["Tokens:Audience"],
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Tokens:Key"])),
                    ValidateLifetime = true
                }
            }); 
            #endregion

            //Middleware added for example only
            app.UseMiddleware<MyMiddleware>();

            #region Use MVC and defines default routes
            app.UseMvc(routes =>
               {
                   routes.MapRoute(
                       name: "default",
                       template: "{controller}/{action}/{id?}",
                       defaults: new { controller = "Home", action = "Angular2" });
               }); 
            #endregion
            seeder.EnsureSeedData().Wait();
        }
        private string ConvertArrayToString(string[] strArr)
        {
            if (strArr == null)
                return string.Empty;
            return String.Join(",", strArr);
        }
        private string[] ConvertStringToArray(string str)
        {
            if (string.IsNullOrEmpty(str))
            {
                return null;
            }
            return str.Split(',');
        }
    }
}
