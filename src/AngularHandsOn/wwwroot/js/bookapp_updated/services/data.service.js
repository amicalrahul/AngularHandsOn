(function () {

    angular.module('bookapp')
        .factory('dataService', ['$http', dataService]);


    function dataService($http) {

        return {
            getAllBooks: getAllBooks
        };
        function getAllBooks() {
            return $http.get('/api/home1/Books')
                .then(success)
                .catch(fail);
        }
        function success(response) {
            return response.data;
        }
        function fail(e) {
            return "failed";
        }
    }
}());