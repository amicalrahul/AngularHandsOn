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

            var authors = Mapper.Map<IEnumerable<Author>>(authorCollections);

            foreach (var author in authors)
            {
                _libraryRepository.AddAuthor(author);
            }

            if(!_libraryRepository.Save())
            {
                throw new Exception("Something went wrong. Please try again later.");
            }

            return Ok();

        }
    }
}
