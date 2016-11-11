using System.Linq;
using System.Collections.Generic;
using Newtonsoft.Json;
using AngularHandsOn.Entities;

public static class Seeder
{
    public static void Seedit(AngularDbContext context)
    {
        //JsonSerializerSettings settings = new JsonSerializerSettings
        //{
        //    ContractResolver = new PrivateSetterContractResolver()
        //};
        context.Database.EnsureCreated();

        var dataText = System.IO.File.ReadAllText(@"~/../AppData/schools.json");
        List<School> schools = JsonConvert.DeserializeObject<List<School>>(dataText);


        dataText = System.IO.File.ReadAllText(@"~/../AppData/classrooms.json");
        List<Classroom> classrooms = JsonConvert.DeserializeObject<List<Classroom>>(dataText);


        dataText = System.IO.File.ReadAllText(@"~/../AppData/activities.json");
        List<Activity> activities = JsonConvert.DeserializeObject<List<Activity>>(dataText);
        try
        {

            if (!context.Schools.Any())
            {
                context.AddRange(schools);
            }
            if (!context.Classrooms.Any())
            {
                context.AddRange(classrooms);
            }
            if (!context.Activities.Any())
            {
                context.AddRange(activities);
            }
            context.SaveChanges();
        }
        catch (System.Exception ex)
        {
            
        }
    }
}