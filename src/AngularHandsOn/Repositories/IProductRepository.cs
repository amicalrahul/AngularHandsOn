using AngularHandsOn.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngularHandsOn.Repositories
{
    public interface IProductRepository<T>: IBaseRepository<Product, T>
    {

        void Update(Product product);

        void Delete(string Id);
    }
}
