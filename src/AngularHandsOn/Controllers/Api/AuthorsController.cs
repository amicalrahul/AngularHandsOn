using AngularHandsOn.Domain;
using AngularHandsOn.Model.ApiModel;
using AngularHandsOn.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngularHandsOn.Controllers.Api
{
    [Route("api/authors")]
    public class AuthorsController : Controller
    {
        private ILibraryRepository _libraryRepository;

        public AuthorsController(ILibraryRepository libraryRepository)
        {
            _libraryRepository = libraryRepository;
        }

        [HttpGet()]
        public IActionResult GetAuthors()
        {
            var authorsFromRepo = _libraryRepository.GetAuthors();

            var authors = Mapper.Map<IEnumerable<AuthorsModel>>(authorsFromRepo);

            return Ok(authors);
        }

        //the Name can be referred in CreatedAtRoute method to refer to this route
        // i.e. while returning the respone for the post request
        [HttpGet("{id}", Name ="GetAuthor")]
        public IActionResult GetAuthor(Guid id)
        {
            var authorFromRepo = _libraryRepository.GetAuthor(id);

            if(authorFromRepo == null)
            {
                return NotFound();
            }

            var author = Mapper.Map<AuthorsModel>(authorFromRepo);

            return Ok(author);
        }

        [HttpPost]
        public IActionResult CreateAuthor([FromBody]AuthorForCreationModel author)
        {
            if(author == null)
            {
                return BadRequest();
            }
            var authorEntity = Mapper.Map<Author>(author);

            _libraryRepository.AddAuthor(authorEntity);

            if(!_libraryRepository.Save())
            {
                throw new Exception("Something went wrong. Please try again later.");
            }

            var authorToReturn = Mapper.Map<AuthorsModel>(authorEntity);

            return new CreatedAtRouteResult("GetAuthor", new { id = authorEntity.Id }, authorToReturn);
        }
    }
}
