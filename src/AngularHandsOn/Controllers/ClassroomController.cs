using AngularHandsOn.Entities;
using AngularHandsOn.Repositories;
using Microsoft.AspNetCore.Mvc;
using NuGet.Protocol.Core.v3;

namespace AngularHandsOn.Controllers
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
            return new ObjectResult(result);
        }
        [HttpGet("GetClassRoom/{id}")]
        public IActionResult Get(int id)
        {
            var result = _classroomRepository.Fetch(id);
            return new ObjectResult(result);
        }
    }
}
