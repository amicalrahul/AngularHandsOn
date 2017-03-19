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
    [Route("api/authors/{authorId}/books")]
    public class BooksApiController : Controller
    {
        private ILibraryRepository _libraryRepository;

        public BooksApiController(ILibraryRepository libraryRepository)
        {
            _libraryRepository = libraryRepository;
        }

        public IActionResult GetBooksForAuthor(Guid authorId)
        {
            if(!_libraryRepository.AuthorExists(authorId))
            {
                return NotFound();
            }

            var booksFromRepo = _libraryRepository.GetBooksForAuthor(authorId);

            var books = Mapper.Map<IEnumerable<BooksApiModel>>(booksFromRepo);

            return Ok(books);
        }

        [HttpGet("{id}", Name = "GetBookForAuthor")]
        public IActionResult GetBookForAuthor(Guid authorId, Guid id)
        {
            if (!_libraryRepository.AuthorExists(authorId))
            {
                return NotFound();
            }

            var bookFromRepo = _libraryRepository.GetBookForAuthor(authorId, id);

            var books = Mapper.Map<BooksApiModel>(bookFromRepo);

            return Ok(books);
        }

        [HttpPost]
        public IActionResult CreateBookForAuthor(Guid authorId, [FromBody]BookForCreationModel book)
        {
            if (book == null)
            {
                return BadRequest();
            }

            if(!_libraryRepository.AuthorExists(authorId))
            {
                return NotFound();
            }

            var bookEntity = Mapper.Map<Book>(book);

            _libraryRepository.AddBookForAuthor(authorId, bookEntity);

            if (!_libraryRepository.Save())
            {
                throw new Exception("Something went wrong. Please try again later.");
            }

            var bookToReturn = Mapper.Map<BooksApiModel>(bookEntity);

            return new CreatedAtRouteResult("GetBookForAuthor", new { authorId = authorId,
                                                                    id = bookEntity.Id }, bookToReturn);
        }
    }
}
