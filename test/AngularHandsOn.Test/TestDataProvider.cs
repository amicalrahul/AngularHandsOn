using AngularHandsOn.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AngularHandsOn.Repositories;

namespace AngularHandsOn.Test
{
    public class TestDataProvider
    {       
        public static School[] GetSchools()
        {
            var schools = Enumerable.Range(1, 10).Select(n =>
                new School()
                {
                    SchoolId = n,
                    Name = "School Name " + n,
                    Principal = "Principal Name " + n,
                    Date = DateTime.UtcNow.AddHours(n)
                }).ToArray();
            return schools;
        }

        public static Classroom[] GetClassroomss()
        {
            var schools = GetSchools();

            var classrooms = Enumerable.Range(1, 10).Select(n =>
                new Classroom()
                {
                    ClassroomId = n + 1,
                    School = schools[n - 1],
                    SchoolId = n,
                    Teacher = "Teacher 1",
                    Name = "Class Name " + n,
                }).ToArray();

            return classrooms;
        }

        public static Activity[] GetActivitiess()
        {
            var schools = GetSchools();

            var classrooms = GetClassroomss();

            var activities = Enumerable.Range(1, 10).Select(n =>
                new Activity()
                {
                    ActivityId = n.ToString(),
                    Classroom = classrooms[n - 1],
                    ClassroomId = n,
                    Name = "School Name " + n,
                    Principal = "Principal Name " + n,
                    Date = DateTime.UtcNow.AddHours(n),
                    School = schools[n - 1],
                    SchoolId = n
                }).ToArray();

            return activities;
        }

        public static void PopulateData(ISchoolRepository<int> schoolRepo, IClassroomRepository<int> classroomRepo, IActivityRepository<int> activityRepo)
        {
            PopulatSchools(schoolRepo);
            PopulatClassrooms(classroomRepo);
            PopulateActivities(activityRepo);
        }
        public static void PopulatSchools(ISchoolRepository<int> schoolRepo)
        {
            var schools = GetSchools();

            schoolRepo.AddRange(schools);
        }
        public static void PopulatClassrooms(IClassroomRepository<int> classroomRepo)
        {           
            var classrooms = GetClassroomss();

            classroomRepo.AddRange(classrooms);
        }
        public static void PopulateActivities(IActivityRepository<int> activityRepo)
        {
            var activities = GetActivitiess();

            activityRepo.AddRange(activities);
        }
    }
}
