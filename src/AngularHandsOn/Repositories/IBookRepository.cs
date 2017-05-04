
using AngularHandsOn.Data;

namespace AngularHandsOn.Repositories
{
    public interface IBookRepository<T> : IBaseRepository<Books, T>
    {
        void Update(Books books);

        void Delete(int Id);
        
    }
}