angular.module('bookapp')
        .controller('BooksController', ['$state','dataService', 'constants', BooksController]);
function BooksController($state, dataService, constants) {

    var vm = this;

    //vm.appName = books.appName;
    vm.allBooks = [];
    vm.goToBook = goToBook;
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

    function goToBook(book) {
        $state.go('editBook', { id: book.book_id });
    }


}