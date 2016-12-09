using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.CodeAnalysis;
using Microsoft.AspNetCore.Mvc;
using System.Globalization;
using AngularHandsOn.Repositories;

namespace AngularHandsOn.Controllers
{
    //[OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
    public class ValidationController : Controller
    {
        private ISchoolRepository<int> _repository;

        public ValidationController(ISchoolRepository<int> repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public JsonResult IsSchoolName_Available(string Name)
        {

            if (!_repository.SchoolNameExists(Name))
                return Json(true);

            string suggestedUID = String.Format(CultureInfo.InvariantCulture,
                "{0} is not available.", Name);

            for (int i = 1; i < 100; i++)
            {
                string altCandidate = Name + i.ToString();
                if (!_repository.SchoolNameExists(altCandidate))
                {
                    suggestedUID = String.Format(CultureInfo.InvariantCulture,
                   "{0} is not available. Try {1}.", Name, altCandidate);
                    break;
                }
            }
            return Json(suggestedUID);
        }

    }
}
