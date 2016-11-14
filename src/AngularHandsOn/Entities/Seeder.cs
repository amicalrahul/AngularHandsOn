using System.Linq;
using System.Collections.Generic;
using Newtonsoft.Json;
using AngularHandsOn.Entities;
using System.Threading.Tasks;

public class Seeder
{
    private AngularDbContext _dbContext;

    public Seeder(AngularDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task EnsureSeedData()
    {

        _dbContext.Database.EnsureCreated();
        

        var dataText = System.IO.File.ReadAllText(@"~/../AppData/schools.json");
        List<School> schools = JsonConvert.DeserializeObject<List<School>>(dataText);


        dataText = System.IO.File.ReadAllText(@"~/../AppData/classrooms.json");
        List<Classroom> classrooms = JsonConvert.DeserializeObject<List<Classroom>>(dataText);


        dataText = System.IO.File.ReadAllText(@"~/../AppData/activities.json");
        List<Activity> activities = JsonConvert.DeserializeObject<List<Activity>>(dataText);
        try
        {
            if (!_dbContext.Schools.Any())
            {
                _dbContext.AddRange(schools);
            }
            if (!_dbContext.Classrooms.Any())
            {
                _dbContext.AddRange(classrooms);
            }
            if (!_dbContext.Activities.Any())
            {
                _dbContext.AddRange(activities);
            }

            await _dbContext.SaveChangesAsync();
        }
        catch (System.Exception ex)
        {

        }
    }
    
}