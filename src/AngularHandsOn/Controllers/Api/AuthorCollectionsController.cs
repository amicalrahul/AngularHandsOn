using AngularHandsOn.Domain;
using AngularHandsOn.Helpers;
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
    [Route("api/authorcollections")]
    public class AuthorCollectionsController : Controller
    {
        private ILibraryRepository _libraryRepository;

        public AuthorCollectionsController(ILibraryRepository libraryRepository)
        {
            _libraryRepository = libraryRepository;
        }

        public IActionResult CreateAuthorCollections([FromBody]IEnumerable<AuthorForCreationModel> authorCollections)
        {
            if(authorCollections == null)
            {
                return BadRequest();
            }

            var authorEntities = Mapper.Map<IEnumerable<Author>>(authorCollections);

            foreach (var author in authorEntities)
            {
                _libraryRepository.AddAuthor(author);
            }

            if(!_libraryRepository.Save())
            {
                throw new Exception("Something went wrong. Please try again later.");
            }

            var authors = Mapper.Map<IEnumerable<AuthorsModel>>(authorEntities);


            var ids = string.Join(",", authorEntities.Select(a => a.Id));


            return new CreatedAtRouteResult("GetAuthorCollections", new { ids = ids }, authorEntities);

        }

        [HttpGet("{ids}", Name = "GetAuthorCollections")]
        public IActionResult GetAuthorCollections([ModelBinder(BinderType =typeof(ArrayModelBinder))]IEnumerable<Guid> ids)
        {
            if(ids == null)
            {
                return BadRequest();
            }

            var authorEntities = _libraryRepository.GetAuthors(ids);

            if(ids.Count() != authorEntities.Count())
            {
                return NotFound();
            }

            var authors = Mapper.Map<IEnumerable<AuthorsModel>>(authorEntities);

            return Ok(authors);
        }
    }
}
