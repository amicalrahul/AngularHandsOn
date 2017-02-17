angular.module('bookapp')
        .controller('BooksController', ['dataService', BooksController]);
function BooksController(dataService) {

    var vm = this;

    //vm.appName = books.appName;
    vm.allBooks = [];
    dataService.getAllBooks()
            .then(function (data) {
                vm.allBooks = data;
            });
    //dataService.getAllReaders()
    //        .then(function (data) {
    //            vm.allReaders = data;
    //        });

    //vm.getBadge = badgeService.retrieveBadge;
    //vm.favoriteBook = $cookies.favoriteBook;


}