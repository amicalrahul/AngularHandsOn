using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngularHandsOn.App_Data
{
    public class AngularDbContext : DbContext
    {
        public AngularDbContext(DbContextOptions options) : base(options)
        {
            
        }

        DbSet<Books> Books { get; set; }
    }


    public class Books
    {

        public int Id { get; set; }

        public int Bookid { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public int YearPublished { get; set; }


    }
    public class AngularHandsOnData
    {
        private AngularDbContext _dbContext;

        public AngularHandsOnData(AngularDbContext dbContext)
        {
            _dbContext = dbContext;
        }
    }
}
