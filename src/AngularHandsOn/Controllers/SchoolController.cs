using AngularHandsOn.Entities;
using AngularHandsOn.Repositories;
using Microsoft.AspNetCore.Mvc;
using NuGet.Protocol.Core.v3;

namespace AngularHandsOn.Controllers
{
    [Route("api/home1")]
    [Produces("application/json")]
    public class SchoolController : Controller
    {
        ISchoolRepository<int> _schoolRepository;

        public SchoolController(AngularDbContext dbContext, ISchoolRepository<int> schoolRepository)
        {
            _schoolRepository = schoolRepository;
        }

        [HttpGet("GetSchools")]
        public IActionResult Get()
        {
            var result = _schoolRepository.Fetch();
            return new ObjectResult(result);
        }
        [HttpGet("GetSchool/{id}")]
        public IActionResult Get(int id)
        {
            var result = _schoolRepository.Fetch(id);

            return new ObjectResult(result);
        }
    }
}
