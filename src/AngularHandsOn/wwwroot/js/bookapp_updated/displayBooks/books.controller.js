angular.module('bookapp')
        .controller('BooksController', ['dataService', 'constants', BooksController]);
function BooksController(dataService, constants) {

    var vm = this;

    //vm.appName = books.appName;
    vm.allBooks = [];
    dataService.getAllBooks()
            .then(function (data) {
                vm.allBooks = data;
            });
    dataService.getAllReaders()
            .then(function (data) {
                vm.allReaders = data;
            });

    vm.getBadge = constants.retrieveBadge;
    //vm.favoriteBook = $cookies.favoriteBook;


}