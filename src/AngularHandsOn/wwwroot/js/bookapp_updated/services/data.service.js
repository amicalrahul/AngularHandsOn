(function () {

    angular.module('bookapp')
        .factory('dataService', ['$http','$q','constants', dataService]);


    function dataService($http, $q, constants) {

        return {
            getAllBooks: getAllBooks,
            getAllReaders: getAllReaders,
            getBookById: getBookById
        };
        function getAllBooks() {
            return $http.get('/api/home1/Books')
                .then(success)
                .catch(fail);
        }
        function getBookById(id) {
            return $http.get('/api/home1/Books/'+id)
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