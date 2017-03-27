using AngularHandsOn.Domain;
using AngularHandsOn.Helpers;
using AngularHandsOn.Model.ApiModel;
using AngularHandsOn.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
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
        private ILogger<BooksApiController> _logger;

        public BooksApiController(ILibraryRepository libraryRepository, 
            ILogger<BooksApiController> logger)
        {
            _libraryRepository = libraryRepository;
            _logger = logger;
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

            if (bookFromRepo == null)
            {
                return NotFound();
            }
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
            if (book.Description == book.Title)
            {
                ModelState.AddModelError(nameof(BookForCreationModel),
                    "The provided description should be different from the title.");
            }

            if (!ModelState.IsValid)
            {
                // return 422
                return new UnprocessableEntityObjectResult(ModelState);
            }
            if (!_libraryRepository.AuthorExists(authorId))
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

        [HttpDelete("{id}")]
        public IActionResult DeleteBookForAuthor(Guid authorId, Guid id)
        {
            if(!_libraryRepository.AuthorExists(authorId))
            {
                NotFound();
            }

            var bookEntity = _libraryRepository.GetBookForAuthor(authorId, id);

            if(bookEntity == null)
            {
                return NotFound();
            }

            _libraryRepository.DeleteBook(bookEntity);
            if(!_libraryRepository.Save())
            {
                throw new Exception("Something went wrong. Please try again later.");
            }
            _logger.LogInformation(100, $"Book with {id} has been deleted");
            return NoContent();
        }
        [HttpPut("{id}")]
        public IActionResult UpdateBookForAuthor(Guid authorId, Guid id, [FromBody]BookForUpdateModel book)
        {
            if(book == null)
            {
                return BadRequest();
            }

            if (book.Description == book.Title)
            {
                ModelState.AddModelError(nameof(BookForCreationModel),
                    "The provided description should be different from the title.");
            }

            if (!ModelState.IsValid)
            {
                // return 422
                return new UnprocessableEntityObjectResult(ModelState);
            }
            if (!_libraryRepository.AuthorExists(authorId))
            {
                NotFound();
            }

            var bookFromRepo = _libraryRepository.GetBookForAuthor(authorId, id);

            if (bookFromRepo == null)
            {
                return NotFound();
            }

            Mapper.Map(book, bookFromRepo);
            _libraryRepository.UpdateBookForAuthor(bookFromRepo);

            if (!_libraryRepository.Save())
            {
                throw new Exception("Something went wrong. Please try again later.");
            }

            return NoContent();
        }

        [HttpPatch("{id}")]
        public IActionResult PartiallyUpdateBookForAuthor(Guid authorid, Guid id,
                                    [FromBody] JsonPatchDocument<BookForUpdateModel> patchDoc)
        {
            if(patchDoc == null)
            {
                return BadRequest();
            }

            if(!_libraryRepository.AuthorExists(authorid))
            {
                return NotFound();
            }

            var bookFromRepo = _libraryRepository.GetBookForAuthor(authorid, id);

            if(bookFromRepo == null)
            {
                return NotFound();
            }

            var bookToPatch = Mapper.Map<BookForUpdateModel>(bookFromRepo);

            patchDoc.ApplyTo(bookToPatch);

            if (bookToPatch.Description == bookToPatch.Title)
            {
                ModelState.AddModelError(nameof(BookForUpdateModel),
                    "The provided description should be different from the title.");
            }

            TryValidateModel(bookToPatch);

            if (!ModelState.IsValid)
            {
                return new UnprocessableEntityObjectResult(ModelState);
            }
            Mapper.Map(bookToPatch, bookFromRepo);
            _libraryRepository.UpdateBookForAuthor(bookFromRepo);

            if (!_libraryRepository.Save())
            {
                throw new Exception("Something went wrong. Please try again later.");
            }

            return NoContent();
        }
    }
}
