using AngularHandsOn.Domain;

namespace AngularHandsOn.Repositories
{
    public interface IProductRepository<T>: IBaseRepository<Product, T>
    {

        void Update(Product product);

        void Delete(string Id);
    }
}
