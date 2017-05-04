(function () {

    angular.module('app.services')
        .factory('dataService', ['$http','$q','constants', dataService]);


    function dataService($http, $q, constants) {
        var bookUrl = '/api/home1/Books';

        return {
            getAllBooks: getAllBooks,
            getAllReaders: getAllReaders,
            getBookById: getBookById
        };
        function getAllBooks() {
            return $http.get(bookUrl)
                .then(success)
                .catch(fail);
        }
        function getBookById(id) {
            return $http.get(bookUrl + '/'+id)
                .then(success)
                .catch(fail);
        }
        function success(response) {
            console.log(response.data);
            return response.data;
        }
        function fail(e) {
            var msg = "query for books failed. " + e.data.description;
            return $q.reject(msg);
        }

        function getAllReaders() { return $q.when(constants.readersArray); }
    }
}());