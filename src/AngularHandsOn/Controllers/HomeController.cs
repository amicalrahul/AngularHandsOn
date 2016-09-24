using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using NuGet.Protocol.Core.v3;

namespace AngularHandsOn.Controllers
{
    public class HomeController : Controller
    {
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

        public IActionResult ProductManagement()
        {
            return View();
        }

        [HttpGet]
        public JsonResult GetBooks()
        {
            var abc = new List<MyClass>()
            {
                new MyClass() { book_id = 1, author = "J.K. Rowling", title =  "Harry Potter and the Deathly Hallows", yearPublished = 2000},
                new MyClass() { book_id = 2, author = "Dr. Seuss", title =  "The Cat in the Hat", yearPublished = 1957},
                new MyClass() { book_id = 3, author = "Donald J. Sobol", title =  "Encyclopedia Brown, Boy Detective", yearPublished = 1234}

            };
            
            return Json(abc);
        }
    }
}


public class MyClass
{
    public int book_id { get; set; }
    public string title { get; set; }
    public string author { get; set; }
    public int yearPublished { get; set; }


}