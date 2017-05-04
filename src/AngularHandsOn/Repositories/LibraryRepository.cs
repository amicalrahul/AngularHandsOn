
using AngularHandsOn.Data;
using AngularHandsOn.Domain;
using AngularHandsOn.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;

namespace AngularHandsOn.Repositories
{
    public class LibraryRepository : ILibraryRepository
    {
        private AngularDbContext _dbContext;

        public LibraryRepository(AngularDbContext context)
        {
            _dbContext = context;
        }

        public void AddAuthor(Author author)
        {
            author.Id = Guid.NewGuid();
            _dbContext.Authors.Add(author);

            // the repository fills the id (instead of using identity columns)
            if (author.Books.Any())
            {
                foreach (var book in author.Books)
                {
                    book.Id = Guid.NewGuid();
                }
            }
        }

        public void AddBookForAuthor(Guid authorId, Book book)
        {
            var author = GetAuthor(authorId);
            if (author != null)
            {
                // if there isn't an id filled out (ie: we're not upserting),
                // we should generate one
                if (book.Id == null)
                {
                    book.Id = Guid.NewGuid();
                }
                author.Books.Add(book);
            }
        }

        public bool AuthorExists(Guid authorId)
        {
            return _dbContext.Authors.Any(a => a.Id == authorId);
        }

        public void DeleteAuthor(Author author)
        {
            _dbContext.Authors.Remove(author);
        }

        public void DeleteBook(Book book)
        {
            _dbContext.BooksApi.Remove(book);
        }

        public Author GetAuthor(Guid authorId)
        {
            return _dbContext.Authors.FirstOrDefault(a => a.Id == authorId);
        }

        public PagedList<Author> GetAuthors(AuthorsResourceParameters authorsResourceParameters)
        {
            var collectionBeforePaging =
                _dbContext.Authors
                .OrderBy(a => a.FirstName)
                .ThenBy(a => a.LastName)
                .AsQueryable();

            if (!string.IsNullOrEmpty(authorsResourceParameters.Genre))
            {
                // trim & ignore casing
                var genreForWhereClause = authorsResourceParameters.Genre
                    .Trim().ToLowerInvariant();
                collectionBeforePaging = collectionBeforePaging
                    .Where(a => a.Genre.ToLowerInvariant() == genreForWhereClause);
            }

            if (!string.IsNullOrEmpty(authorsResourceParameters.SearchQuery))
            {
                // trim & ignore casing
                var searchQueryForWhereClause = authorsResourceParameters.SearchQuery
                    .Trim().ToLowerInvariant();

                collectionBeforePaging = collectionBeforePaging
                    .Where(a => a.Genre.ToLowerInvariant().Contains(searchQueryForWhereClause)
                    || a.FirstName.ToLowerInvariant().Contains(searchQueryForWhereClause)
                    || a.LastName.ToLowerInvariant().Contains(searchQueryForWhereClause));
            }

            return PagedList<Author>.Create(collectionBeforePaging,
                authorsResourceParameters.PageNumber,
                authorsResourceParameters.PageSize);
        }

        public IEnumerable<Author> GetAuthors(IEnumerable<Guid> authorIds)
        {
            return _dbContext.Authors.Where(a => authorIds.Contains(a.Id))
                .OrderBy(a => a.FirstName)
                .OrderBy(a => a.LastName)
                .ToList();
        }

        public void UpdateAuthor(Author author)
        {
            // no code in this implementation
        }

        public Book GetBookForAuthor(Guid authorId, Guid bookId)
        {
            return _dbContext.BooksApi
              .Where(b => b.AuthorId == authorId && b.Id == bookId).FirstOrDefault();
        }

        public IEnumerable<Book> GetBooksForAuthor(Guid authorId)
        {
            return _dbContext.BooksApi
                        .Where(b => b.AuthorId == authorId).OrderBy(b => b.Title).ToList();
        }

        public void UpdateBookForAuthor(Book book)
        {
            // no code in this implementation
        }

        public bool Save()
        {
            return (_dbContext.SaveChanges() >= 0);
        }
    }
}
