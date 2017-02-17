angular.module('bookapp')
        .controller('booksController', ['$resource', booksController]);
function booksController($resource) {

    var vm = this;

    //vm.appName = books.appName;

    bookResource($resource).Get
            .then(function (data) {
                vm.allBooks = data;
            });
    //dataService.getAllReaders()
    //        .then(function (data) {
    //            vm.allReaders = data;
    //        });

    //vm.getBadge = badgeService.retrieveBadge;
    //vm.favoriteBook = $cookies.favoriteBook;


    function bookResource($resource) {
        return {
            Get: $resource("/api/home1/Books").query().$promise

        };
    }
}