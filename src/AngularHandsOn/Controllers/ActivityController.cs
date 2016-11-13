using AngularHandsOn.Entities;
using AngularHandsOn.Repositories;
using Microsoft.AspNetCore.Mvc;
using NuGet.Protocol.Core.v3;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngularHandsOn.Controllers
{
    [Route("api/home1")]
    public class ActivityController : Controller
    {
        IActivityRepository<int> _activityRepository;

        public ActivityController(IActivityRepository<int> activityRepository)
        {
            _activityRepository = activityRepository;
        }

        [HttpGet("GetActivities")]
        public IActionResult Get()
        {
            var result = _activityRepository.Fetch();
            return new ObjectResult(result);
        }
        [HttpGet("GetActivities/{id}")]
        public IActionResult Get(int id)
        {
            var result = _activityRepository.Fetch(id);
            return new ObjectResult(result);
        }
    }
}
