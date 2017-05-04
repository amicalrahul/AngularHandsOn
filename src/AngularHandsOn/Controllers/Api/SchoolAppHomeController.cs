using AngularHandsOn.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace AngularHandsOn.Controllers.Api
{
    [Route("api/home1")]
    [Produces("application/json")]
    public class SchoolAppHomeController
    {
        private ISchoolRepository<int> _schoolRepository;
        private IActivityRepository<int> _activityRepository;
        private IClassroomRepository<int> _classroomRepository;

        public SchoolAppHomeController(ISchoolRepository<int> schoolRepository,
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


    }
}
