using AngularHandsOn.Entities;
using AngularHandsOn.Model;
using AngularHandsOn.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using NuGet.Protocol.Core.v3;
using System.Collections.Generic;
using System.Linq;

namespace AngularHandsOn.Controllers
{
    [Route("api/home1")]
    [Produces("application/json")]
    public class SchoolController : Controller
    {
        ISchoolRepository<int> _schoolRepository;
        private IActivityRepository<int> _activityRepository;
        private IClassroomRepository<int> _classroomRepository;

        public SchoolController(AngularDbContext dbContext, ISchoolRepository<int> schoolRepository,
            IClassroomRepository<int> classroomRepository, IActivityRepository<int> activityRepository)
        {
            _schoolRepository = schoolRepository;
            _activityRepository = activityRepository;
            _classroomRepository = classroomRepository;
        }

        [HttpGet("GetAllObjectsCount")]
        public IActionResult GetAllObjectsCount()
        {
            var result1 = _schoolRepository.Fetch();
            var result2 = _classroomRepository.Fetch();
            var result3 = _activityRepository.Fetch();
            //var results = Mapper.Map<IEnumerable<SchoolModel>>(result);
            return new ObjectResult(new
            {
                schoolCount = result1.Count(),
                classroomCount = result2.Count(),
                activityCount = result3.Count()
            }
            );
        }

        [HttpGet("GetSchools")]
        public IActionResult Get()
        {
            var result = _schoolRepository.Fetch();
            var results = Mapper.Map<IEnumerable<SchoolModel>>(result);
            return new ObjectResult(results);
        }
        [HttpGet("GetSchool/{id}")]
        public IActionResult Get(int id)
        {
            var result = _schoolRepository.Fetch(id);
            var results = Mapper.Map<SchoolModel>(result);

            return new ObjectResult(results);
        }
    }
}
