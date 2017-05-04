using AngularHandsOn.Domain;

namespace AngularHandsOn.Repositories
{
    public interface ISchoolRepository<T> : IBaseRepository<School, T>
    {
        void Update(School School);
        
        void Delete(int Id);

        bool SchoolNameExists(string schoolName, int schoolId);
    }
}
