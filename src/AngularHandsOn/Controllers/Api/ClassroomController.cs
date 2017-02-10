using AngularHandsOn.Entities;
using AngularHandsOn.Model;
using AngularHandsOn.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using NuGet.Protocol.Core.v3;
using System.Collections.Generic;

namespace AngularHandsOn.Controllers.Api
{
    [Route("api/home1/Classrooms")]
    public class ClassroomController : Controller
    {
        IClassroomRepository<int> _classroomRepository;

        public ClassroomController(IClassroomRepository<int> classroomRepository)
        {
            _classroomRepository = classroomRepository;
        }

        [HttpGet()]
        public IActionResult Get([FromQuery]string name)
        {
            IEnumerable<Classroom> result;
            if (!string.IsNullOrWhiteSpace(name))
            {
                result = _classroomRepository.Find(name);
            }
            else
            {
                result = _classroomRepository.Fetch();
            }
            var results = Mapper.Map<IEnumerable<ClassroomModel>>(result);
            return new ObjectResult(results);
        }
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var result = _classroomRepository.Fetch(id);

            var results = Mapper.Map<ClassroomModel>(result);
            return new ObjectResult(results);
        }

        [HttpPost("")]
        public IActionResult Post([FromBody]ClassroomModel classroom)
        {
            var cl = Mapper.Map<Classroom>(classroom);
            cl.ClassroomId = _classroomRepository.GetMaxId() + 1;
            cl.SchoolId = classroom.SchoolId;
            cl.Name = classroom.Name;
            cl.Teacher = classroom.Teacher;
            
            _classroomRepository.Add(cl);

            var result = _classroomRepository.Fetch();
            var results = Mapper.Map<IEnumerable<ClassroomModel>>(result);
            return new ObjectResult(results);
        }
    }
}
