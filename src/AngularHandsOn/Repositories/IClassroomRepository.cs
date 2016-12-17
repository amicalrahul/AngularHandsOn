using AngularHandsOn.Entities;
using AngularHandsOn.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngularHandsOn.Repositories
{
    public interface IClassroomRepository<T> : IBaseRepository<Classroom, T>
    {
        int GetMaxId();
    }
}
