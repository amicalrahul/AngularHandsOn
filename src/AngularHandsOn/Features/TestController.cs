using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngularHandsOn.Features
{
    public class TestController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
