using AngularHandsOn.Model;
using AngularHandsOn.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngularHandsOn.Features.ManageClassrooms
{
    public class ManageClassroomsController : Controller
    {
        private IClassroomRepository<int> _repo;

        public ManageClassroomsController(IClassroomRepository<int> repo)
        {
            _repo = repo;
        }

        public IActionResult Index()
        {
            return View(Mapper.Map<IEnumerable<ClassroomModel>>(_repo.Fetch()));
        }
    }
}
