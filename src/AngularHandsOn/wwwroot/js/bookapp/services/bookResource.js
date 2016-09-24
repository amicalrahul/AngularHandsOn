(function () {

    angular.module('app')
        .factory('bookResource',
        ['$resource', bookResource]);

    function bookResource($resource) {

        return  $resource("/api/books1");

        //return $resource('/api/books1/:book_id', { book_id: '@book_id' },
        //    {
        //        'update': { method: 'PUT' }
        //    }
        //);
    }

}());