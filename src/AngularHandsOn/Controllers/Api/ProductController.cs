using AngularHandsOn.Entities;
using AngularHandsOn.Model;
using AngularHandsOn.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace AngularHandsOn.Controllers.Api
{
    [Route("api/home1/Products")]
    [Produces("application/json")]
    public class ProductController: Controller
    {
        IProductRepository<string> _productRepository;

        public ProductController(IProductRepository<string> productRepository)
        {
            _productRepository = productRepository;
        }

        [HttpGet("")]
        public IActionResult Get()
        {
            var result = _productRepository.Fetch();
            var results = Mapper.Map<IEnumerable<ProductModel>>(result);
            return new ObjectResult(results);
        }
        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            var result = _productRepository.Fetch(id);

            if (result == null)
                return NotFound();
            var results = Mapper.Map<ProductModel>(result);

            return new ObjectResult(results);
        }

        [HttpPost("")]
        public IActionResult Post([FromBody]ProductModel product)
        {
            if (ModelState.IsValid)
            {
                var sc = Mapper.Map<Product>(product);
                sc.ProductId = ((int)_productRepository.GetMaxId() + 1).ToString();
                _productRepository.Add(sc);
            }
            var result = _productRepository.Fetch();
            var results = Mapper.Map<IEnumerable<ProductModel>>(result);
            return new ObjectResult(results);
        }

        [HttpPut("{id}")]
        public IActionResult Put(string id, [FromBody]ProductModel product)
        {
            var sc = Mapper.Map<Product>(product);
            _productRepository.Update(sc);

            var result = _productRepository.Fetch();
            var results = Mapper.Map<IEnumerable<ProductModel>>(result);
            return new ObjectResult(results);
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            _productRepository.Delete(id);

            var result = _productRepository.Fetch();
            var results = Mapper.Map<IEnumerable<ProductModel>>(result);
            return new ObjectResult(results);
        }

    }
}
