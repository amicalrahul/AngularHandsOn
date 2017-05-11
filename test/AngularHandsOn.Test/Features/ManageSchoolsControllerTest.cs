
using AngularHandsOn.Data;
using AngularHandsOn.Domain;
using AngularHandsOn.Features.ManageSchools;
using AngularHandsOn.Model;
using AngularHandsOn.Repositories;
using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Xunit;
using Moq;
using AutoMapper;

namespace AngularHandsOn.Test.Features
{
    public class ManageSchoolsControllerTest
    {
        private readonly IServiceProvider _serviceProvider;

        public ManageSchoolsControllerTest()
        {
            var efServiceProvider = new ServiceCollection().AddEntityFrameworkInMemoryDatabase().BuildServiceProvider();

            var services = new ServiceCollection();

            services.AddDbContext<AngularDbContext>(b => b.UseInMemoryDatabase("Test").UseInternalServiceProvider(efServiceProvider));


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
        public void Create_Test()
        {
            var repo = new Mock<ISchoolRepository<int>>();
            var controller = new ManageSchoolsController(repo.Object);

            var result = controller.Create();
            var viewResult = Assert.IsType<ViewResult>(result);
            Assert.Null(viewResult.ViewName);
        }
        [Fact]
        public void Create_Post_InvalidModelState_Test()
        {
            var dbContext = _serviceProvider.GetRequiredService<AngularDbContext>();
            var repo = new Mock<ISchoolRepository<int>>();
            var controller = new ManageSchoolsController(repo.Object);
            controller.ModelState.AddModelError("error", "error");
            var result = controller.Create((new Mock<SchoolModel>()).Object);
            var viewResult = Assert.IsType<ViewResult>(result);            

            Assert.Null(viewResult.ViewName);
        }
    }
}
