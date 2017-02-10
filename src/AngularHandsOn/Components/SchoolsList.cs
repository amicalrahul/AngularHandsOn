using AngularHandsOn.Model;
using AngularHandsOn.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AngularHandsOn.Components
{
    public class SchoolsList : ViewComponent
    {
        private ISchoolRepository<int> _repo;

        public SchoolsList(ISchoolRepository<int> repo)
        {
            _repo = repo;
        }

        public async Task<IViewComponentResult> InvokeAsync()
        {
            var result = await Task.Run(() => _repo.Fetch());
            return View(Mapper.Map<IEnumerable<SchoolModel>>(result));
        }
    }
}
