﻿using AngularHandsOn.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngularHandsOn.Repositories
{
    public interface ISchoolRepository<T> : IBaseRepository<School, T>
    {

    }
}