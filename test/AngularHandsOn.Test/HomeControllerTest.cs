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
            services.AddTransient<ISchoolRepository<int>, SchoolRepository>();
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
            PopulateData(dbContext);
            var repo = _serviceProvider.GetRequiredService<ISchoolRepository<int>>();
            var controller = new HomeController(dbContext);

            // Act
            var result = controller.Schools(repo);

            // Assert
            var viewResult = Assert.IsType<ViewResult>(result);

            var model = Assert.IsType<List<SchoolModel>>(viewResult.Model);

            Assert.Equal(10, model.Count());
        }


        private void PopulateData(DbContext context)
        {
            var schools = TestAlbumDataProvider.GetSchools();

            foreach (var school in schools)
            {
                context.Add(school);
            }

            context.SaveChanges();
        }

        private class TestAlbumDataProvider
        {
            public static School[] GetSchools()
            {
                var schools = Enumerable.Range(1, 10).Select(n =>
                    new School()
                    {
                        SchoolId = n,
                        Name = "School Name " + n,
                        Principal = "Principal Name " + n,
                        Date = DateTime.UtcNow.AddHours(n)
                    }).ToArray();

                var classrooms = Enumerable.Range(1, 10).Select(n =>
                    new Classroom()
                    {
                        ClassroomId = n + 1,
                        School = schools[n - 1],
                        SchoolId = n,
                        Teacher = "Teacher 1",
                        Name = "Class Name " + n,
                    }).ToArray();

                var activities = Enumerable.Range(1, 10).Select(n =>
                    new Activity()
                    {
                        ActivityId = n.ToString(),
                        Classroom = classrooms[n - 1],
                        ClassroomId = n,
                        Name = "School Name " + n,
                        Principal = "Principal Name " + n,
                        Date = DateTime.UtcNow.AddHours(n),
                        School = schools[n - 1],
                        SchoolId = n                       
                    }).ToArray();

                return schools;
            }
        }

    }
}
