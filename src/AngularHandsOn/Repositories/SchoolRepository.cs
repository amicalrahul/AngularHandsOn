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
            return _dbContext.Schools.SingleOrDefault(a => a.Id == id);
        }
    }
}
