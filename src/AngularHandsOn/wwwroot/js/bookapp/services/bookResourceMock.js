/**
 * Created by Deb on 8/21/2014.
 */
(function() {
    "use strict";

    var app = angular
        .module("bookResourceMock",
        ["ngMockE2E"]);

    app.run(function($httpBackend) {
        var booksArray = [
            {
                book_id: 1,
                title: 'Harry Potter and the Deathly Hallows',
                author: 'J.K. Rowling',
                yearPublished: 2000
            },
            {
                book_id: 2,
                title: 'The Cat in the Hat',
                author: 'Dr. Seuss',
                yearPublished: 1957
            },
            {
                book_id: 3,
                title: 'Encyclopedia Brown, Boy Detective',
                author: 'Donald J. Sobol',
                yearPublished: 1963
            }
        ];

        var productUrl1 = "/api/books1";

        $httpBackend.whenGET(productUrl1).respond(booksArray);
    });
}());


//(function () {

//    var app = angular
//        .module("bookResourceMock",
//                    ["ngMockE2E"]);

//    app.run(function ($httpBackend) {

//        var booksArray = [
//                {
//                    book_id: 1,
//                    title: 'Harry Potter and the Deathly Hallows',
//                    author: 'J.K. Rowling',
//                    yearPublished: 2000
//                },
//                {
//                    book_id: 2,
//                    title: 'The Cat in the Hat',
//                    author: 'Dr. Seuss',
//                    yearPublished: 1957
//                },
//                {
//                    book_id: 3,
//                    title: 'Encyclopedia Brown, Boy Detective',
//                    author: 'Donald J. Sobol',
//                    yearPublished: 1963
//                }
//        ];

//        var readersArray = [
//                {
//                    reader_id: 1,
//                    name: 'Marie',
//                    weeklyReadingGoal: 315,
//                    totalMinutesRead: 5600
//                },
//                {
//                    reader_id: 2,
//                    name: 'Daniel',
//                    weeklyReadingGoal: 210,
//                    totalMinutesRead: 3000
//                },
//                {
//                    reader_id: 3,
//                    name: 'Lanier',
//                    weeklyReadingGoal: 140,
//                    totalMinutesRead: 600
//                }
//        ];

//        var productUrl = "../../api/books1/:book_id";

//        $httpBackend.whenGET(productUrl).respond(booksArray);

//    });

//}());