using AngularHandsOn.Domain;
using AngularHandsOn.Model;
using AngularHandsOn.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading;

namespace AngularHandsOn.Controllers.Api
{
    [Route("api/home1/Schools")]
    [Produces("application/json")]
    public class SchoolController : Controller
    {
        ISchoolRepository<int> _schoolRepository;

        public SchoolController(ISchoolRepository<int> schoolRepository)
        {
            _schoolRepository = schoolRepository;
        }

        [HttpGet("")]
        [Authorize]
        public IActionResult Get()
        {
            var result = _schoolRepository.Fetch();
            var results = Mapper.Map<IEnumerable<SchoolModel>>(result);
            Thread.Sleep(1000);
            return new ObjectResult(results);
        }
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var result = _schoolRepository.Fetch(id);

            if (result == null)
                return NotFound();
            var results = Mapper.Map<SchoolModel>(result);

            return new ObjectResult(results);
        }

        [HttpPost("")]
        public IActionResult Post([FromBody]SchoolModel school)
        {
            if (ModelState.IsValid)
            {
                var sc = Mapper.Map<School>(school);
                sc.Date = DateTime.UtcNow;
                sc.SchoolId = _schoolRepository.GetMaxId() + 1;
                _schoolRepository.Add(sc);
            }
            var result = _schoolRepository.Fetch();
            var results = Mapper.Map<IEnumerable<SchoolModel>>(result);
            return new ObjectResult(results);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]SchoolModel school)
        {
            var sc = Mapper.Map<School>(school);
            _schoolRepository.Update(sc);

            var result = _schoolRepository.Fetch();
            var results = Mapper.Map<IEnumerable<SchoolModel>>(result);
            return new ObjectResult(results);
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {            
            _schoolRepository.Delete(id);

            var result = _schoolRepository.Fetch();
            var results = Mapper.Map<IEnumerable<SchoolModel>>(result);
            return new ObjectResult(results);
        }
    }
}
