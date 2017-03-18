using AngularHandsOn.Domain;
using AngularHandsOn.Model;
using AngularHandsOn.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using AutoMapper;

namespace AngularHandsOn.Controllers.Api
{
    /// <summary>
    /// Activity Controller
    /// </summary>
    [Route("api/home1/Activities")]
    [Produces("application/json")]
    public class ActivityController : Controller
    {
        IActivityRepository<int> _activityRepository;
        /// <summary>
        /// Contrustor
        /// </summary>
        /// <param name="activityRepository"></param>
        public ActivityController(IActivityRepository<int> activityRepository)
        {
            _activityRepository = activityRepository;
        }

        /// <summary>
        /// Get()
        /// </summary>
        /// <returns></returns>
        [HttpGet("")]
        public IActionResult Get()
        {
            var result = _activityRepository.Fetch();
            var results = Mapper.Map<IEnumerable<ActivityModel>>(result);
            return new ObjectResult(results);
        }

        /// <summary>
        /// Get(int id)
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var result = _activityRepository.Fetch(id);

            var results = Mapper.Map<ActivityModel>(result);
            return new ObjectResult(results);
        }
        [HttpPost("")]
        public IActionResult Post([FromBody]ActivityModel activity)
        {
            var act = Mapper.Map<Activity>(activity);
            act.ActivityId = (_activityRepository.GetMaxId() + 1).ToString();
            act.ClassroomId = activity.ClassroomId;
            act.SchoolId = activity.SchoolId;
            act.Name = activity.Name;
            act.Date = activity.Date;

            _activityRepository.Add(act);

            var result = _activityRepository.Fetch();
            var results = Mapper.Map<IEnumerable<ActivityModel>>(result);
            return new ObjectResult(results);
        }
    }
}
