using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AngularHandsOn.Entities;
using Microsoft.EntityFrameworkCore;

namespace AngularHandsOn.Repositories
{
    public class ActivityRepository : IActivityRepository<int>
    {
        private AngularDbContext _dbContext;

        public ActivityRepository(AngularDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public IEnumerable<Activity> Fetch()
        {
            return _dbContext.Activities.Include(a => a.Classroom).Include(a => a.School).ToList();
        }

        public Activity Fetch(int id)
        {
            return _dbContext.Activities.First(a => a.ActivityId == id.ToString());
        }
    }
}
