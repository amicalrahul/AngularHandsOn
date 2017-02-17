/* jshint -W079 */
var mockData = (function () {
    return {
        getMockBook: getMockBook,
        getMockStates: getMockStates,
        getMockReaders: getMockReaders
    };

    function getMockStates() {
        return [
          {
              state: 'dashboard',
              config: {
                  url: '/',
                  templateUrl: '../bookapp_updated/displaybooks/books.html',
                  title: 'dashboard',
                  settings: {
                      nav: 1,
                      content: '<i class="fa fa-dashboard"></i> Dashboard'
                  }
              }
          }
        ];
    }
    function getMockReaders() {
        return [
                { reader_id: 1, name: 'Marie', weeklyReadingGoal: 315, totalMinutesRead: 5600 },
                { reader_id: 2, name: 'Daniel', weeklyReadingGoal: 210, totalMinutesRead: 3000 },
                { reader_id: 3, name: 'Lanier', weeklyReadingGoal: 140, totalMinutesRead: 600 }
        ];
    }
    function getMockBook() {
        return [
            { "book_id": 1, "title": "Goodnight Moon", "author": "Margaret Wise Brown", "year_published": 1953 },
            { "book_id": 2, "title": "Green Eggs and Ham", "author": "Dr. Seuss", "year_published": 1960 },
            { "book_id": 3, "title": "Where the Wild Things Are", "author": "Maurice Sendak", "year_published": 1963 },
            { "book_id": 4, "title": "The Hobbit", "author": "J. R. R. Tolkien", "year_published": 1937 },
            { "book_id": 5, "title": "Curious George", "author": "H. A. Rey", "year_published": 1941 },
            { "book_id": 6, "title": "Alice's Adventures in Wonderland", "author": "Lewis Carroll", "year_published": 1865 }
        ];
    }
})();
