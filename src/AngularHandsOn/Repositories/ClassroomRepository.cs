﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AngularHandsOn.Entities;
using Microsoft.EntityFrameworkCore;
using AngularHandsOn.Model;

namespace AngularHandsOn.Repositories
{
    public class ClassroomRepository : IClassroomRepository<int>
    {
        private AngularDbContext _dbContext;

        public ClassroomRepository(AngularDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IEnumerable<Classroom> Fetch()
        {
            return _dbContext.Classrooms.Include(a => a.School).ToList();
        }

        public int GetMaxId()
        {
            return _dbContext.Classrooms.Select(x => x.ClassroomId).Max();
        }

        public void Add(Classroom Classroom)
        {
            _dbContext.Classrooms.Add(Classroom);
            _dbContext.SaveChanges();
        }

        public void AddRange(Classroom[] items)
        {
            _dbContext.Classrooms.AddRange(items);
            _dbContext.SaveChanges();
        }
        public Classroom Fetch(int id)
        {
            if (string.IsNullOrWhiteSpace(id.ToString()))
            {
                return null;
            }
            return _dbContext.Classrooms.Where(a=> a.ClassroomId == id).Include(a => a.School)
                .Include(a => a.Activity).First();
        }
    }
}
