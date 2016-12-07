using System;
using AngularHandsOn.Model;
using AngularHandsOn.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System.Collections;
using System.Collections.Generic;

namespace AngularHandsOn.Features.ManageActivities
{
    public class ManageActivitiesController :Controller
    {
        private IActivityRepository<int> _repo;

        public ManageActivitiesController(IActivityRepository<int> repo)
        {
            _repo = repo;
        }

        public IActionResult Index()
        {
            return View(Mapper.Map<IEnumerable<ActivityModel>>(_repo.Fetch()));
        }
    }
}
