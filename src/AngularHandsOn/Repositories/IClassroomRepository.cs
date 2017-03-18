using AngularHandsOn.Domain;
using System.Collections.Generic;

namespace AngularHandsOn.Repositories
{
    public interface IClassroomRepository<T> : IBaseRepository<Classroom, T>
    {
        IEnumerable<Classroom> Find(string name);
    }
}
