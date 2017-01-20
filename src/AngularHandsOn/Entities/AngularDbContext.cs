using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
namespace AngularHandsOn.Entities
{
    public class AngularDbContext : IdentityDbContext<User>
    {
        public AngularDbContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<Books> Books { get; set; }
        public DbSet<School> Schools { get; set; }
        public DbSet<Classroom> Classrooms { get; set; }
        public DbSet<Activity> Activities { get; set; }
        public DbSet<Product> Products { get; set; }
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
