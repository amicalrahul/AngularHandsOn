(function () {

    angular.module('app')
        .factory('bookResource',
        ['$resource', bookResource]);

    function bookResource($resource) {

        return {
            getAllBooks: $resource("/Home/GetBooks").query().$promise
            
        };

                //return $resource('/api/books1/:book_id', { book_id: '@book_id' },
                //    {
                //        'update': { method: 'PUT' }
                //    }
        //);
    }

}());