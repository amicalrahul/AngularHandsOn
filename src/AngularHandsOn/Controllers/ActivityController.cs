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
        public JsonStringResult Get()
        {
            var result = _activityRepository.Fetch();
            if (result == null)
            {
                return new JsonStringResult("");
            }
            var str = result.ToJson();
            return new JsonStringResult(str);
        }
        [HttpGet("GetActivities/{id}")]
        public JsonStringResult Get(int id)
        {
            var result = _activityRepository.Fetch(id);
            if (result == null)
            {
                return new JsonStringResult("");
            }
            var str = result.ToJson();
            return new JsonStringResult(str);
        }
    }
}
