
using AngularHandsOn.Data;
using AngularHandsOn.Model;
using AngularHandsOn.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading;

namespace AngularHandsOn.Controllers.Api
{
    [Route("api/home1/Books")]
    [Produces("application/json")]
    public class BookController : Controller
    {
        IBookRepository<int> _bookRepository;

        public BookController(IBookRepository<int> bookRepository)
        {
            _bookRepository = bookRepository;
        }

        [HttpGet("")]
        [Authorize]
        public IActionResult Get()
        {
            var result = _bookRepository.Fetch();
            var results = Mapper.Map<IEnumerable<BookModel>>(result);
            Thread.Sleep(1000);
            return new ObjectResult(results);
        }
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var result = _bookRepository.Fetch(id);

            if (result == null)
                return NotFound();
            var results = Mapper.Map<BookModel>(result);

            return new ObjectResult(results);
        }

        [HttpPost("")]
        public IActionResult Post([FromBody]BookModel school)
        {
            if (ModelState.IsValid)
            {
                var sc = Mapper.Map<Books>(school);
                sc.Bookid = _bookRepository.GetMaxId() + 1;
                _bookRepository.Add(sc);
            }
            var result = _bookRepository.Fetch();
            var results = Mapper.Map<IEnumerable<BookModel>>(result);
            return new ObjectResult(results);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]BookModel school)
        {
            var sc = Mapper.Map<Books>(school);
            _bookRepository.Update(sc);

            var result = _bookRepository.Fetch();
            var results = Mapper.Map<IEnumerable<BookModel>>(result);
            return new ObjectResult(results);
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _bookRepository.Delete(id);

            var result = _bookRepository.Fetch();
            var results = Mapper.Map<IEnumerable<BookModel>>(result);
            return new ObjectResult(results);
        }

    }
}
