(function () {
    "use strict";
    angular.module('bookapp')
        .controller('BooksController', ['$cookies', '$state', 'dataService', 'constants',
                                            'alerting', '$exceptionHandler', BooksController]);
    function BooksController($cookies, $state, dataService, constants, alerting, $exceptionHandler) {

            var vm = this;
            //vm.appName = books.appName;
            vm.allBooks = [];
            vm.goToBook = goToBook;
            dataService.getAllBooks()
                    .then(function (data) {
                        alerting.addInfo("Books List count:" + data.length)
                        vm.allBooks = data;
                    })
                    .catch(function (e) {
                        $exceptionHandler(e);
                    });
            dataService.getAllReaders()
                    .then(function (data) {
                        vm.allReaders = data;
                    })
                    .catch(function (e) {
                        $exceptionHandler(e);
                    });;

            vm.getBadge = constants.retrieveBadge;
            vm.favoriteBook = $cookies.favoriteBook;

            function goToBook(bookId) {
                $state.go('editBook', { id: bookId });
            }


        }
}());