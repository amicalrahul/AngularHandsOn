﻿using AngularHandsOn.Entities;
using AngularHandsOn.Model;
using AngularHandsOn.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NuGet.Protocol.Core.v3;
using System.Collections.Generic;
using System.Linq;
using System.Threading;

namespace AngularHandsOn.Controllers.Api
{
    [Route("api/home1")]
    [Produces("application/json")]
    public class SchoolController : Controller
    {
        ISchoolRepository<int> _schoolRepository;

        public SchoolController(ISchoolRepository<int> schoolRepository)
        {
            _schoolRepository = schoolRepository;
        }

        [HttpGet("GetSchools")]
        [Authorize]
        public IActionResult Get()
        {
            var result = _schoolRepository.Fetch();
            var results = Mapper.Map<IEnumerable<SchoolModel>>(result);
            Thread.Sleep(1000);
            return new ObjectResult(results);
        }
        [HttpGet("GetSchool/{id}")]
        public IActionResult Get(int id)
        {
            var result = _schoolRepository.Fetch(id);

            if (result == null)
                return NotFound();
            var results = Mapper.Map<SchoolModel>(result);

            return new ObjectResult(results);
        }
    }
}