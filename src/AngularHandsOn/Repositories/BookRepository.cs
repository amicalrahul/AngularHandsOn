using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AngularHandsOn.Entities;

namespace AngularHandsOn.Repositories
{
    public class BookRepository : IBookRepository<int>
    {
        private AngularDbContext _dbContext;

        public BookRepository(AngularDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public IEnumerable<Books> Fetch()
        {
            return _dbContext.Books;
        }

        public Books Fetch(int id)
        {
            if (string.IsNullOrWhiteSpace(id.ToString()))
            {
                return null;
            }
            return _dbContext.Books.SingleOrDefault(a => a.Bookid == id);
        }

        public int GetMaxId()
        {
            return _dbContext.Books.Select(x => x.Id).Max();
        }

        public void Add(Books Books)
        {
            _dbContext.Books.Add(Books);
            _dbContext.SaveChanges();
        }
        public void AddRange(Books[] items)
        {
            _dbContext.Books.AddRange(items);
            _dbContext.SaveChanges();
        }
        public void Update(Books Books)
        {
            //var originalSchool = _dbContext.Schools.AsNoTracking().FirstOrDefault(p => p.SchoolId == School.SchoolId);
            //_dbContext.Entry(originalSchool).Context.Update(School);

            _dbContext.Books.Update(Books);
            _dbContext.SaveChanges();
        }
        public void Delete(int Id)
        {
            _dbContext.Books.Remove(_dbContext.Books.First(x => x.Bookid == Id));
            _dbContext.SaveChanges();
        }
        
        public bool Save()
        {
            return (_dbContext.SaveChanges() >= 0);
        }

    }
}
