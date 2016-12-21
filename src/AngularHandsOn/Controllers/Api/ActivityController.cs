using AngularHandsOn.Entities;
using AngularHandsOn.Model;
using AngularHandsOn.Repositories;
using Microsoft.AspNetCore.Mvc;
using NuGet.Protocol.Core.v3;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;

namespace AngularHandsOn.Controllers.Api
{
    [Route("api/home1/Activities")]
    public class ActivityController : Controller
    {
        IActivityRepository<int> _activityRepository;

        public ActivityController(IActivityRepository<int> activityRepository)
        {
            _activityRepository = activityRepository;
        }

        [HttpGet("")]
        public IActionResult Get()
        {
            var result = _activityRepository.Fetch();
            var results = Mapper.Map<IEnumerable<ActivityModel>>(result);
            return new ObjectResult(results);
        }
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
            act.Date = DateTime.UtcNow;

            _activityRepository.Add(act);

            var result = _activityRepository.Fetch();
            var results = Mapper.Map<IEnumerable<ActivityModel>>(result);
            return new ObjectResult(results);
        }
    }
}
