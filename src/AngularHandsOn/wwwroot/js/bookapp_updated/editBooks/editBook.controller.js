(function () {
    angular.module('bookapp')
        .controller('EditBooksController', ['$cookies', '$state', '$stateParams', 'dataService', 'constants',
            'alerting', EditBooksController]);
    function EditBooksController($cookies, $state, $stateParams, dataService, constants, alerting) {
        var vm = this;

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