(function () {
    angular.module('bookapp')
        .controller('EditBooksController', ['$cookies', '$state', '$stateParams', 'dataService', 'constants',
            'alerting', EditBooksController]);
    function EditBooksController($cookies, $state, $stateParams, dataService, constants, alerting) {
        var vm = this;
        
        vm.addBook = function (bookForm) {
            var book = {

            }
            if ($stateParams.id === '0') {
                dataService.addBook(vm.currentBook)
            .then(function (data) {
                alerting.addInfo("Book stored:" + vm.currentBook.title)
                $state.go('books');
            });
            }
            else {
                dataService.updateBook($stateParams.id, vm.currentBook)
            .then(function (data) {
                alerting.addInfo("Book stored:" + vm.currentBook.title)
                $state.go('books');
            });
            }
        };
        dataService.getBookById($stateParams.id)
            .then(function (data) {
                vm.currentBook = data;
            });
        vm.back = function() {
            $state.go('books');
        }
        vm.setAsFavorite = function () {
            alerting.addInfo("Favorite Book stored:" + vm.currentBook.title)
            $cookies.favoriteBook = vm.currentBook;
        }
    }

}());