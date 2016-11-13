using AngularHandsOn.Entities;
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
    //[Produces("application/json")]
    public class SchoolAppController : Controller
    {
        private AngularDbContext _dbContext;

        public SchoolAppController(AngularDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet("GetSchools")]
        public JsonStringResult GetSchools()
        {
            var str = _dbContext.Schools.ToJson();
            return new JsonStringResult(str);
        }
        [HttpGet("GetSchools/{id}")]
        public JsonStringResult GetSchool(object id)
        {
            if (id == null || string.IsNullOrWhiteSpace(id.ToString()))
            {
                return new JsonStringResult("");
            }
            var str = _dbContext.Schools.First(a => a.SchoolId == id.ToString()).ToJson();
            return new JsonStringResult(str);
        }
        [HttpGet("GetClassRooms")]
        public JsonStringResult GetClassRooms()
        {
            var str = _dbContext.Classrooms.ToList()
                .Select(f => new {
                    name = f.Name,
                    teacher = f.Teacher,
                    id = f.ClassroomId,
                    school_id = f.SchoolId,
                    school = _dbContext.Schools.First(a => a.SchoolId == f.SchoolId.ToString())
                }
                )
                .ToJson();
            return new JsonStringResult(str);
        }
        [HttpGet("GetClassRoom/{id}")]
        public JsonStringResult GetClassRoom(int id)
        {
            if (string.IsNullOrWhiteSpace(id.ToString()))
            {
                return new JsonStringResult("");
            }
            var str = _dbContext.Classrooms.Where(a => a.ClassroomId == id.ToString()).ToList()
                .Select(f => new
                {
                    name = f.Name,
                    teacher = f.Teacher,
                    id = f.ClassroomId,
                    school_id = f.SchoolId,
                    school = _dbContext.Schools.Where(a => a.SchoolId == f.SchoolId.ToString()).First(),
                    activities = _dbContext.Activities.Where(a => a.ClassroomId == f.ClassroomId)
                }).First()
                .ToJson();
            return new JsonStringResult(str);
        }

        [HttpGet("GetActivities")]
        public JsonStringResult GetActivities()
        {
            var str = _dbContext.Activities.ToList()
                .Select(f => new
                {
                    name = f.Name,
                    date = f.Date,
                    activity_id = f.ActivityId,
                    classroom_id = f.ClassroomId,
                    school_id = f.SchoolId,
                    school = _dbContext.Schools.First(a => a.SchoolId == f.SchoolId.ToString()),
                    classroom = _dbContext.Classrooms.Where(a => a.ClassroomId == f.ClassroomId).First()
                }).ToJson();
            return new JsonStringResult(str);
        }
        [HttpGet("GetActivities/{id}")]
        public JsonStringResult GetActivity(int id)
        {
            if (string.IsNullOrWhiteSpace(id.ToString()))
            {
                return new JsonStringResult("");
            }
            var str = _dbContext.Activities.First(a => a.ActivityId == id.ToString()).ToJson();
            return new JsonStringResult(str);
        }

    }
}
