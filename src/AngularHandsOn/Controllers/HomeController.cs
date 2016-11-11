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
        //public JsonStringResult GetSchools(object id)
        //{
        //    var json = System.IO.File.ReadAllText((@"~/../AppData/schools.json"));


        //    return new JsonStringResult(json);
        //}
        [HttpGet]
        public JsonStringResult GetClassRooms()
        {
            var str = _dbContext.Classrooms.ToJson();
            return new JsonStringResult(str);
        }
        //[HttpGet]
        //public JsonStringResult GetClassRooms(object id)
        //{
        //    var classRoomData = GetClassRooms();
        //    var schoolData = GetSchools();
        //    var activitiesData = GetActivities();
        //     var abc = Json(System.IO.File.ReadAllText((@"~/../AppData/classrooms.json")));



        //    var json = System.IO.File.ReadAllText((@"~/../AppData/classrooms.json"));
        //    return new JsonStringResult(json);
        //}

        [HttpGet]
        public JsonStringResult GetActivities()
        {
            var str = _dbContext.Activities.ToJson();
            return new JsonStringResult(str);
        }
        //[HttpGet]
        //public JsonStringResult GetActivities(object id)
        //{
        //    var json = System.IO.File.ReadAllText((@"~/../AppData/activities.json"));


        //    return new JsonStringResult(json);
        //}
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
