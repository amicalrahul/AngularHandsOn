using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AngularHandsOn.Entities;

namespace AngularHandsOn.Repositories
{
    public class ActivityRepository : IActivityRepository<int>
    {
        private AngularDbContext _dbContext;

        public ActivityRepository(AngularDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public IEnumerable<object> Fetch()
        {
            return _dbContext.Activities.ToList()
                 .Select(f => new
                 {
                     name = f.Name,
                     date = f.Date,
                     activity_id = f.ActivityId,
                     classroom_id = f.ClassroomId,
                     school_id = f.SchoolId,
                     school = _dbContext.Schools.First(a => a.SchoolId == f.SchoolId.ToString()),
                     classroom = _dbContext.Classrooms.Where(a => a.ClassroomId == f.ClassroomId).First()
                 });
        }

        public object Fetch(int id)
        {
            if (string.IsNullOrWhiteSpace(id.ToString()))
            {
                return new JsonStringResult("");
            }
            return _dbContext.Activities.First(a => a.ActivityId == id.ToString());
        }
    }
}
