(function () {
    "use strict";
    angular.module('bookapp')
        .controller('BooksController', ['$cookies', '$state', 'dataService', 'constants', 'alerting',
            'bookService', BooksController]);
    function BooksController($cookies, $state, dataService, constants, alerting, bookService) {

            var vm = this;
            //vm.appName = books.appName;
            vm.allBooks = [];
            vm.goToBook = goToBook;
            dataService.getAllBooks()
                    .then(function (data) {
                        alerting.addInfo("Books List count:" + data.length)
                        vm.allBooks = data;
                    });
            dataService.getAllReaders()
                    .then(function (data) {
                        vm.allReaders = data;
                    });

            vm.getBadge = constants.retrieveBadge;
            vm.favoriteBook = $cookies.favoriteBook;

            function goToBook(book) {
                $state.go('editBook', { id: book.book_id });
            }


        }
}());