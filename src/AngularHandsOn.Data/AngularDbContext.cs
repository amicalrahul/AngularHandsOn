using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Newtonsoft.Json;
using AngularHandsOn.Domain;

namespace AngularHandsOn.Data
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
        public DbSet<Author> Authors { get; set; }
        public DbSet<Book> BooksApi { get; set; }
    }


    public class Books
    {
        
        [JsonIgnore]
        public int Id { get; set; }

        [JsonProperty(PropertyName = "book_id")]
        public int Bookid { get; set; }
        [JsonProperty(PropertyName = "title")]
        public string Title { get; set; }
        [JsonProperty(PropertyName = "author")]
        public string Author { get; set; }
        [JsonProperty(PropertyName = "year_published")]
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
