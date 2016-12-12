using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.CodeAnalysis;
using Microsoft.AspNetCore.Mvc;
using System.Globalization;
using AngularHandsOn.Repositories;
using AngularHandsOn.Model;

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
        public JsonResult IsSchoolName_Available(SchoolModel schoolModel)
        {
            int id;
            int.TryParse(schoolModel.SchoolId, out id);
            if (!_repository.SchoolNameExists(schoolModel.Name, id))
                return Json(true);

            string suggestedUID = String.Format(CultureInfo.InvariantCulture,
                "{0} is not available.", schoolModel.Name);

            for (int i = 1; i < 100; i++)
            {
                string altCandidate = schoolModel.Name + i.ToString();
                if (!_repository.SchoolNameExists(altCandidate, id))
                {
                    suggestedUID = String.Format(CultureInfo.InvariantCulture,
                   "{0} is not available. Try {1}.", schoolModel.Name, altCandidate);
                    break;
                }
            }
            return Json(suggestedUID);
        }

    }
}
