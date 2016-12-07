using AngularHandsOn.Entities;
using AngularHandsOn.Model;
using AngularHandsOn.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngularHandsOn.Features.ManageSchools
{
    public class ManageSchoolsController : Controller
    {
        private ISchoolRepository<int> _repo;

        public ManageSchoolsController(ISchoolRepository<int> repo)
        {
            _repo = repo;
        }

        public IActionResult Index()
        {
            return View(Mapper.Map<IEnumerable<SchoolModel>>(_repo.Fetch()));
        }

        [HttpGet]
        public IActionResult Create()
        {

            return View();
        }

        [HttpPost]
        public IActionResult Create(School school)
        {

            return View("Index");
        }

    }
}
