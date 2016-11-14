using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using NuGet.Protocol.Core.v3;
using AngularHandsOn.Entities;

namespace AngularHandsOn.Controllers
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
            return View();
        }

        public IActionResult About()
        {
            ViewData["Message"] = "Your application description page.";

            return View();
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

            var json = System.IO.File.ReadAllText((@"~/../AppData/books.json"));
            
            //var abc = new List<MyClass>()
            //{
            //    new MyClass() { book_id = 1, author = "J.K. Rowling", title =  "Harry Potter and the Deathly Hallows", yearPublished = 2000},
            //    new MyClass() { book_id = 2, author = "Dr. Seuss", title =  "The Cat in the Hat", yearPublished = 1957},
            //    new MyClass() { book_id = 3, author = "Donald J. Sobol", title =  "Encyclopedia Brown, Boy Detective", yearPublished = 1234}

            //};

            return new JsonStringResult(json);
        }
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
