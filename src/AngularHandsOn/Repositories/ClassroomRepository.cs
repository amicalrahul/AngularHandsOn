using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AngularHandsOn.Entities;

namespace AngularHandsOn.Repositories
{
    public class ClassroomRepository : IClassroomRepository<int>
    {
        private AngularDbContext _dbContext;

        public ClassroomRepository(AngularDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        IEnumerable<Object> IBaseRepository<Object, int>.Fetch()
        {
            return _dbContext.Classrooms.ToList()
                .Select(f => new
                {
                    name = f.Name,
                    teacher = f.Teacher,
                    id = f.ClassroomId,
                    school_id = f.SchoolId,
                    school = _dbContext.Schools.First(a => a.SchoolId == f.SchoolId.ToString())
                }
                );
        }

        Object IBaseRepository<Object, int>.Fetch(int id)
        {
            if (string.IsNullOrWhiteSpace(id.ToString()))
            {
                return null;
            }
            return _dbContext.Classrooms.Where(a => a.ClassroomId == id.ToString()).ToList()
                .Select(f => new
                {
                    name = f.Name,
                    teacher = f.Teacher,
                    id = f.ClassroomId,
                    school_id = f.SchoolId,
                    school = _dbContext.Schools.Where(a => a.SchoolId == f.SchoolId.ToString()).First(),
                    activities = _dbContext.Activities.Where(a => a.ClassroomId == f.ClassroomId)
                }).First();
        }
    }
}
