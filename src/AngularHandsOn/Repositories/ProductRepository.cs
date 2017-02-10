using AngularHandsOn.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngularHandsOn.Repositories
{
    public class ProductRepository : IProductRepository<string>
    {
        private AngularDbContext _dbContext;

        public ProductRepository(AngularDbContext dbContext)
        {
            _dbContext = dbContext;
        }


        public void Add(Product Product)
        {
            _dbContext.Products.Add(Product);
            _dbContext.SaveChanges();
        }
        public void AddRange(Product[] items)
        {
            _dbContext.Products.AddRange(items);
            _dbContext.SaveChanges();
        }

        public void Delete(string Id)
        {
            _dbContext.Products.Remove(_dbContext.Products.First(x => x.ProductId == Id));
            _dbContext.SaveChanges();
        }

        public IEnumerable<Product> Fetch()
        {
            return _dbContext.Products;
        }

        public Product Fetch(string id)
        {
            return _dbContext.Products.First(a => a.ProductId == id);
        }

        public int GetMaxId()
        {
            return _dbContext.Products.Select(x => int.Parse(x.ProductId)).Max();
        }

        public void Update(Product product)
        {
            _dbContext.Products.Update(product);
            _dbContext.SaveChanges();
        }
        public bool Save()
        {
            return (_dbContext.SaveChanges() >= 0);
        }
    }
}
