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
            var results = Mapper.Map<IEnumerable<ActivityModel>>(result);
            return new ObjectResult(results);
        }
        [HttpGet("GetActivities/{id}")]
        public IActionResult Get(int id)
        {
            var result = _activityRepository.Fetch(id);

            var results = Mapper.Map<ActivityModel>(result);
            return new ObjectResult(results);
        }
    }
}
