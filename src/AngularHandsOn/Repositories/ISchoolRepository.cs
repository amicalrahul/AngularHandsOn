using AngularHandsOn.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngularHandsOn.Repositories
{
    public interface ISchoolRepository<T> : IBaseRepository<School, T>
    {
        void Update(School School);

        void Add(School School);
        void Delete(int Id);

        bool SchoolNameExists(string schoolName, int schoolId);
        int GetMaxId();
    }
}
