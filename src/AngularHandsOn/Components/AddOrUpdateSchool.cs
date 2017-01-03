using AngularHandsOn.Model;
using AngularHandsOn.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngularHandsOn.Components
{
    public class AddOrUpdateSchool : ViewComponent
    {
        private ISchoolRepository<int> _repo;

        public AddOrUpdateSchool(ISchoolRepository<int> repo)
        {
            _repo = repo;
        }
        public async Task<IViewComponentResult> InvokeAsync(int? SchoolId)
        {
            var school = new SchoolModel();
            if(SchoolId.HasValue && SchoolId >0)
            {
                school = Mapper.Map<SchoolModel>(_repo.Fetch(SchoolId.Value));
            }

            await Task.FromResult(0);
            return View(school);
        }
    }
}
