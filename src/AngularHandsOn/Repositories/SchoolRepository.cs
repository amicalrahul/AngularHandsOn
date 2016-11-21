using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AngularHandsOn.Entities;

namespace AngularHandsOn.Repositories
{
    public class SchoolRepository : ISchoolRepository<int>
    {
        private AngularDbContext _dbContext;

        public SchoolRepository(AngularDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public IEnumerable<School> Fetch()
        {
            return _dbContext.Schools;
        }

        public School Fetch(int id)
        {
            if (string.IsNullOrWhiteSpace(id.ToString()))
            {
                return null;
            }
            return _dbContext.Schools.SingleOrDefault(a => a.SchoolId == id);
        }

        public int GetMaxId()
        {
            return _dbContext.Schools.Select(x => x.SchoolId).Max();
        }

        public void Add(School School)
        {
            _dbContext.Schools.Add(School);
            _dbContext.SaveChanges();
        }
        public void Update(School School)
        {
            _dbContext.Schools.Update(School);
            _dbContext.SaveChanges();
        }
        public void Delete(int Id)
        {
            _dbContext.Schools.Remove(_dbContext.Schools.First(x => x.SchoolId == Id));
            _dbContext.SaveChanges();
        }
    }
}
