using AngularHandsOn.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngularHandsOn.Repositories
{
    public interface IBookRepository<T> : IBaseRepository<Books, T>
    {
        void Update(Books books);

        void Delete(int Id);
        
    }
}