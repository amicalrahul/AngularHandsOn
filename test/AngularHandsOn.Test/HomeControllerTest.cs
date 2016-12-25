using AngularHandsOn.Controllers.Web;
using AngularHandsOn.Entities;
using AngularHandsOn.Model;
using AngularHandsOn.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.TestHost;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace AngularHandsOn.Test
{
    public class HomeControllerTest
    {
        private readonly TestServer _server;
        private readonly HttpClient _client;
        private readonly IServiceProvider _serviceProvider;
        public HomeControllerTest()
        {
            //_server = new TestServer(new WebHostBuilder()
            //            .UseStartup<Startup>());
            //_client = _server.CreateClient();


            var efServiceProvider = new ServiceCollection().AddEntityFrameworkInMemoryDatabase().BuildServiceProvider();

            var services = new ServiceCollection();

            services.AddDbContext<AngularDbContext>(b => b.UseInMemoryDatabase().UseInternalServiceProvider(efServiceProvider));
            services.AddScoped<ISchoolRepository<int>, SchoolRepository>();
            services.AddScoped<IClassroomRepository<int>, ClassroomRepository>();
            services.AddScoped<IActivityRepository<int>, ActivityRepository>();
            _serviceProvider = services.BuildServiceProvider();

            #region Automapper Mappings Defined
            Mapper.Initialize(cfg =>
            {
                cfg.CreateMap<SchoolModel, School>().ReverseMap();
                cfg.CreateMap<ClassroomModel, Classroom>().ReverseMap();
                cfg.CreateMap<ActivityModel, Activity>().ReverseMap();
            });
            #endregion

        }
        [Fact]
        public void Index_Test()
        {
            // Act
            // Arrange
            var dbContext = _serviceProvider.GetRequiredService<AngularDbContext>();
            var controller = new HomeController(dbContext);

            // Act
            var result = controller.Index();

            // Assert
            var viewResult = Assert.IsType<ViewResult>(result);

            Assert.Equal("", "");
        }
        [Fact]
        public void Schools_Test()
        {
            // Act
            // Arrange
            var dbContext = _serviceProvider.GetRequiredService<AngularDbContext>();
            var schoolRepo = _serviceProvider.GetRequiredService<ISchoolRepository<int>>();
            TestDataProvider.PopulatSchools(schoolRepo);

            var controller = new HomeController(dbContext);

            // Act
            var result = controller.Schools(schoolRepo);

            // Assert
            var viewResult = Assert.IsType<ViewResult>(result);

            var model = Assert.IsType<List<SchoolModel>>(viewResult.Model);

            Assert.Equal(10, model.Count());
        }        
    }
}
