using AngularHandsOn.Entities;
using AngularHandsOn.Repositories;
using Microsoft.AspNetCore.Mvc;
using NuGet.Protocol.Core.v3;

namespace AngularHandsOn.Controllers
{
    [Route("api/home1")]
    public class SchoolController : Controller
    {
        ISchoolRepository<int> _schoolRepository;

        public SchoolController(AngularDbContext dbContext, ISchoolRepository<int> schoolRepository)
        {
            _schoolRepository = schoolRepository;
        }

        [HttpGet("GetSchools")]
        public JsonStringResult Get()
        {
            var result = _schoolRepository.Fetch();
            if (result == null)
            {
                return new JsonStringResult("");
            }
            var str = result.ToJson();
            return new JsonStringResult(str);
        }
        [HttpGet("GetSchool/{id}")]
        public JsonStringResult Get(int id)
        {
            var result = _schoolRepository.Fetch(id);
            if (result == null)
            {
                return new JsonStringResult("");
            }
            var str = result.ToJson();
            return new JsonStringResult(str);
        }
    }
}
