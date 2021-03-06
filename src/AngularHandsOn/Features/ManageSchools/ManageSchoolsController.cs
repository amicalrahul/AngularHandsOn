﻿using AngularHandsOn.Domain;
using AngularHandsOn.Filters;
using AngularHandsOn.Model;
using AngularHandsOn.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace AngularHandsOn.Features.ManageSchools
{
    [ServiceFilter(typeof(UnitOfWorkFilter))]
    public class ManageSchoolsController : Controller
    {
        private ISchoolRepository<int> _repo;

        public ManageSchoolsController(ISchoolRepository<int> repo)
        {
            _repo = repo;
        }

        public IActionResult Index()
        {
            return View(Mapper.Map<IEnumerable<SchoolModel>>(_repo.Fetch()));
        }

        [HttpGet]
        public IActionResult Create()
        {

            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Create(SchoolModel school)
        {
            if (ModelState.IsValid)
            {
                var sc = Mapper.Map<School>(school);
                sc.Date = DateTime.UtcNow;
                sc.SchoolId = _repo.GetMaxId() + 1;
                _repo.Add(sc);

                return RedirectToAction("Index");
            }
            ModelState.AddModelError(string.Empty, "Please correct the errors!");
            return View(school);
        }

        public IActionResult Edit(int id)
        {
            var result = Mapper.Map<SchoolModel>(_repo.Fetch(id));
            return View(result);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        
        public IActionResult Edit(SchoolModel school)
        {
            if (ModelState.IsValid)
            {
                var sc = Mapper.Map<School>(school);
                _repo.Update(sc);
                return RedirectToAction(nameof(Index));
            }
            ModelState.AddModelError(string.Empty, "Please correct the errors!");
            return View(school);
        }


        public IActionResult Delete(int id)
        {
            return View(Mapper.Map<SchoolModel>(_repo.Fetch(id)));
        }

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public IActionResult DeleteConfirmed(int id)
        {
            _repo.Delete(id);
            return RedirectToAction("Index");
        }

    }
}
