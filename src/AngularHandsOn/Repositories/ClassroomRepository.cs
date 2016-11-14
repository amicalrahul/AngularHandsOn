using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AngularHandsOn.Entities;
using Microsoft.EntityFrameworkCore;
using AngularHandsOn.Model;

namespace AngularHandsOn.Repositories
{
    public class ClassroomRepository : IClassroomRepository<int>
    {
        private AngularDbContext _dbContext;

        public ClassroomRepository(AngularDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IEnumerable<Classroom> Fetch()
        {
            return _dbContext.Classrooms.Include(a => a.School).ToList();
        }

        public Classroom Fetch(int id)
        {
            if (string.IsNullOrWhiteSpace(id.ToString()))
            {
                return null;
            }
            return _dbContext.Classrooms.Where(a=> a.ClassroomId == id).Include(a => a.School)
                .Include(a => a.Activity).First();


            //.Where(a => a.ClassroomId == id.ToString()).ToList()
            //    .Select(f => new
            //    {
            //        name = f.Name,
            //        teacher = f.Teacher,
            //        id = f.ClassroomId,
            //        school_id = f.SchoolId,
            //        school = _dbContext.Schools.Where(a => a.SchoolId == f.SchoolId.ToString()).First(),
            //        activities = _dbContext.Activities.Where(a => a.ClassroomId == f.ClassroomId)
            //    }).First();
        }
    }
}
