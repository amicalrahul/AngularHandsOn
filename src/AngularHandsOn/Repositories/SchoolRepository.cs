using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AngularHandsOn.Entities;
using Microsoft.EntityFrameworkCore;

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
            //var originalSchool = _dbContext.Schools.AsNoTracking().FirstOrDefault(p => p.SchoolId == School.SchoolId);
            //_dbContext.Entry(originalSchool).Context.Update(School);

            _dbContext.Schools.Update(School);
            _dbContext.SaveChanges();
        }
        public void Delete(int Id)
        {
            _dbContext.Schools.Remove(_dbContext.Schools.First(x => x.SchoolId == Id));
            _dbContext.SaveChanges();
        }

        public bool SchoolNameExists(string schoolName)
        {
            if (_dbContext.Schools.Any(a => a.Name.Equals(schoolName, StringComparison.OrdinalIgnoreCase)))
                return true;
            else
                return false;
        }
        public bool Save()
        {
            return (_dbContext.SaveChanges() >= 0);
        }
    }
}
