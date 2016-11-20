using AngularHandsOn.Entities;
using AngularHandsOn.Model;
using AngularHandsOn.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using NuGet.Protocol.Core.v3;
using System.Collections.Generic;

namespace AngularHandsOn.Controllers.Api
{
    [Route("api/home1")]
    public class ClassroomController : Controller
    {
        IClassroomRepository<int> _classroomRepository;

        public ClassroomController(IClassroomRepository<int> classroomRepository)
        {
            _classroomRepository = classroomRepository;
        }

        [HttpGet("GetClassRooms")]
        public IActionResult Get()
        {
            var result = _classroomRepository.Fetch();
            var results = Mapper.Map<IEnumerable<ClassroomModel>>(result);            
            return new ObjectResult(results);
        }
        [HttpGet("GetClassRoom/{id}")]
        public IActionResult Get(int id)
        {
            var result = _classroomRepository.Fetch(id);

            var results = Mapper.Map<ClassroomModel>(result);
            return new ObjectResult(results);
        }
    }
}
