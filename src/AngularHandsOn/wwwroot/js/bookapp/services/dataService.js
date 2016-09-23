(function () {

    angular.module('app')
        .factory('dataService', ['$q', '$timeout', '$http', 'constants', "productResource", dataService]);


    function dataService($q, $timeout, $http, constants, productResource) {

        return {
            getAllBooks: getAllBooks,
            getAllReaders: getAllReaders
        };
        function getAllBooks() {

            productResource.query(function (data) {
               return  data;
            });
            //return $http.get('../../api/books1')
            //    .then(sendResponseData)
            //    .catch(sendGetBooksError);

        }

        //function transformGetBooks(data, headersGetter) {

        //    var transformed = angular.fromJson(data);

        //    transformed.forEach(function (currentValue, index, array) {
        //        currentValue.dateDownloaded = new Date();
        //    });

        //    //console.log(transformed);
        //    return transformed;

        //}

        //function sendResponseData(response) {

        //    return response.data;

        //}

        //function sendGetBooksError(response) {

        //    return $q.reject('Error retrieving book(s). (HTTP status: ' + response.status + ')');

        //}

        //function getAllBooks() {

        //    var booksArray = [
        //        {
        //            book_id: 1,
        //            title: 'Harry Potter and the Deathly Hallows',
        //            author: 'J.K. Rowling',
        //            yearPublished: 2000
        //        },
        //        {
        //            book_id: 2,
        //            title: 'The Cat in the Hat',
        //            author: 'Dr. Seuss',
        //            yearPublished: 1957
        //        },
        //        {
        //            book_id: 3,
        //            title: 'Encyclopedia Brown, Boy Detective',
        //            author: 'Donald J. Sobol',
        //            yearPublished: 1963
        //        }
        //    ];

        //    var deferred = $q.defer();


        //    $timeout(function () {

        //        var successful = true;
        //        if (successful) {

        //            deferred.notify('Just getting started gathering books...');
        //            deferred.notify('Almost done gathering books...');

        //            deferred.resolve(booksArray);

        //        } else {

        //            deferred.reject('Error retrieving books.');

        //        }

        //    }, 50);

        //    return deferred.promise;

        //}

        function getAllReaders() {

            var readersArray = [
                {
                    reader_id: 1,
                    name: 'Marie',
                    weeklyReadingGoal: 315,
                    totalMinutesRead: 5600
                },
                {
                    reader_id: 2,
                    name: 'Daniel',
                    weeklyReadingGoal: 210,
                    totalMinutesRead: 3000
                },
                {
                    reader_id: 3,
                    name: 'Lanier',
                    weeklyReadingGoal: 140,
                    totalMinutesRead: 600
                }
            ];

            var deferred = $q.defer();

            $timeout(function () {

                deferred.resolve(readersArray);

            }, 50);

            return deferred.promise;
        }
    }

}());