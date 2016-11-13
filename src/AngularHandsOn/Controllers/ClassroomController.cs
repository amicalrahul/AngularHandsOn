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
        public JsonStringResult Get()
        {
            var result = _classroomRepository.Fetch();
            if (result == null)
            {
                return new JsonStringResult("");
            }
            var str = result.ToJson();
            return new JsonStringResult(str);
        }
        [HttpGet("GetClassRoom/{id}")]
        public JsonStringResult Get(int id)
        {
            var result = _classroomRepository.Fetch(id);
            if (result == null)
            {
                return new JsonStringResult("");
            }
            var str = result.ToJson();
            return new JsonStringResult(str);
        }
    }
}
