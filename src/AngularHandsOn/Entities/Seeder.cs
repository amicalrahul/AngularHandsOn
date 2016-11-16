using System.Linq;
using System.Collections.Generic;
using Newtonsoft.Json;
using AngularHandsOn.Entities;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

public class Seeder
{
    private AngularDbContext _dbContext;
    private UserManager<User> _userManager;

    public Seeder(AngularDbContext dbContext, UserManager<User> userManager)
    {
        _dbContext = dbContext;
        _userManager = userManager;
    }

    public async Task EnsureSeedData()
    {

        _dbContext.Database.EnsureCreated();
        if (await _userManager.FindByEmailAsync("a.a@a.com") == null)
        {
            var user = new User()
            {
                UserName = "testuser",
                Email = "a.a@a.com"
            };

            await _userManager.CreateAsync(user, "P@ssw0rd!");
        }




        try
        {
            if (!_dbContext.Schools.Any())
            {
                var dataText = System.IO.File.ReadAllText(@"~/../AppData/schools.json");
                List<School> schools = JsonConvert.DeserializeObject<List<School>>(dataText);
                _dbContext.AddRange(schools);
            }
            if (!_dbContext.Classrooms.Any())
            {
                var dataText = System.IO.File.ReadAllText(@"~/../AppData/classrooms.json");
                List<Classroom> classrooms = JsonConvert.DeserializeObject<List<Classroom>>(dataText);
                _dbContext.AddRange(classrooms);
            }
            if (!_dbContext.Activities.Any())
            {
                var dataText = System.IO.File.ReadAllText(@"~/../AppData/activities.json");
                List<Activity> activities = JsonConvert.DeserializeObject<List<Activity>>(dataText);
                _dbContext.AddRange(activities);
            }

            await _dbContext.SaveChangesAsync();
        }
        catch (System.Exception ex)
        {

        }
    }
    
}