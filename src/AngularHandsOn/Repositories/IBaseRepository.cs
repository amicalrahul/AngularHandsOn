using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngularHandsOn.Repositories
{

    public interface IBaseRepository<U, V>
    {
        /// <summary>
        /// Fetches all items.
        /// </summary>
        /// <returns>List of items.</returns>
        IEnumerable<U> Fetch();

        /// <summary>
        /// Fetches an item by its identifier.
        /// </summary>
        /// <param name="id">Unique identifier</param>
        /// <returns>Item or null</returns>
        U Fetch(V id);

        /// <summary>
        /// Inserts a new item.
        /// </summary>
        /// <param name="item">The item.</param>
        void Add(U item);

        /// <summary>
        /// Inserts a new item.
        /// </summary>
        /// <param name="item">The item.</param>
        void AddRange(U[] items);

        ///// <summary>
        ///// Updates an item.
        ///// </summary>
        ///// <param name="item"></param>
        //void Update(U item);

        ///// <summary>
        ///// Deletes an item.
        ///// </summary>
        ///// <param name="item"></param>
        //void Delete(U item);

        ///// <summary>
        ///// Deletes an item by its unique identifer.
        ///// </summary>
        ///// <param name="id"></param>
        //bool DeleteIf(V id);

        ///// <summary>
        ///// Creates the Cassandra tables for this type.
        ///// </summary>
        //void CreateTables();

    }
}
