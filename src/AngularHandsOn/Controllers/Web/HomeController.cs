using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using NuGet.Protocol.Core.v3;
using AngularHandsOn.Data;
using AngularHandsOn.Repositories;
using AutoMapper;
using AngularHandsOn.Model;

namespace AngularHandsOn.Controllers.Web
{
    public class HomeController : Controller
    {
        private AngularDbContext _dbContext;

        public HomeController(AngularDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public IActionResult Index()
        {
            return View("Index");
        }

        public IActionResult About()
        {
            ViewData["Message"] = "Your application description page.";

            return View();
        }
        public IActionResult SchoolsList()
        {
            return ViewComponent("SchoolsList");
        }

        public IActionResult EditSchool(int id)
        {
            return ViewComponent("AddOrUpdateSchool", new { SchoolId = id});
        }

        //[Authorize]
        public IActionResult Schools([FromServices]ISchoolRepository<int> schoolRepository)
        {

            var result = schoolRepository.Fetch();
            var results = Mapper.Map<IEnumerable<SchoolModel>>(result);
            return View(results);
        }

        public IActionResult Contact()
        {
            ViewData["Message"] = "Your contact page.";

            return View();
        }

        public IActionResult Error()
        {
            return View();
        }

        public IActionResult Angular()
        {
            return View();
        }


        public IActionResult Angular2()
        {
            return View();
        }

        public IActionResult SchoolApp()
        {
            return View();
        }
        public IActionResult ProductManagement()
        {
            return View();
        }
        public IActionResult NgDirective()
        {
            return View();
        }
        [HttpGet]
        public JsonStringResult GetSchools()
        {
            var str = _dbContext.Schools.ToJson();
            return new JsonStringResult(str);
        }
        //[HttpGet]
        //public JsonStringResult GetSchool(object id)
        //{
        //    if(id == null || string.IsNullOrWhiteSpace(id.ToString()))
        //    {
        //        return new JsonStringResult("");
        //    }
        //    var str = _dbContext.Schools.First(a=> a.SchoolId == id).ToJson();
        //    return new JsonStringResult(str);
        //}
        [HttpGet]
        public JsonStringResult GetClassRooms()
        {
            var str = _dbContext.Classrooms.ToList()
                .Select(f => new {
                    name = f.Name,
                    teacher = f.Teacher,
                    id = f.ClassroomId,
                    school_id = f.SchoolId,
                    school = _dbContext.Schools.First(a => a.SchoolId == f.SchoolId)
                }
                )                
                .ToJson();
            return new JsonStringResult(str);
        }
        [HttpGet]
        public JsonStringResult GetClassRoom(int id)
        {
            if (string.IsNullOrWhiteSpace(id.ToString()))
            {
                return new JsonStringResult("");
            }
            var str = _dbContext.Classrooms.Where(a => a.ClassroomId == id).ToList()
                .Select(f => new
                {
                    name = f.Name,
                    teacher = f.Teacher,
                    id = f.ClassroomId,
                    school_id = f.SchoolId,
                    school = _dbContext.Schools.Where(a => a.SchoolId == f.SchoolId).First(),
                    activities = _dbContext.Activities.Where(a=> a.ClassroomId == f.ClassroomId)
                })
                .ToJson();
            return new JsonStringResult(str);
        }

        [HttpGet]
        //public JsonStringResult GetActivities()
        //{
        //    var str = _dbContext.Activities.ToList()
        //        .Select(f => new
        //        {
        //            name = f.Name,
        //            date = f.Date,
        //            activity_id = f.ActivityId,
        //            classroom_id = f.ClassroomId,
        //            school_id = f.SchoolId,
        //            school = _dbContext.Schools.First(a => a.SchoolId == f.SchoolId),
        //            classroom = _dbContext.Classrooms.Where(a => a.ClassroomId == f.ClassroomId).First()
        //        }).ToJson();
        //    return new JsonStringResult(str);
        //}
        [HttpGet]
        public JsonStringResult GetActivity(int id)
        {
            if (string.IsNullOrWhiteSpace(id.ToString()))
            {
                return new JsonStringResult("");
            }
            var str = _dbContext.Activities.First(a => a.ActivityId == id.ToString()).ToJson();
            return new JsonStringResult(str);
        }
        [HttpGet]
        public JsonStringResult GetBooks()
        {
            return new JsonStringResult(_dbContext.Books.ToJson());
        }
        //[HttpGet]
        //public JsonStringResult GetBooks(int id)
        //{
        //    if (string.IsNullOrWhiteSpace(id.ToString()))
        //    {
        //        return new JsonStringResult("");
        //    }
        //    var str = _dbContext.Books.First(a => a.Bookid == id).ToJson();
        //    return new JsonStringResult(str);
        //}
    }
}
public class JsonStringResult : ContentResult
{
    public JsonStringResult(string json)
    {
        Content = json;
        ContentType = "application/json";
    }
}
