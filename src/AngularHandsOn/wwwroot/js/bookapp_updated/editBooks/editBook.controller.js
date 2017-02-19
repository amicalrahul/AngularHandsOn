(function () {
    angular.module('bookapp')
        .controller('EditBooksController', ['$stateParams', 'dataService', 'constants', EditBooksController]);
    function EditBooksController($stateParams, dataService, constants) {
        var vm = this;

        dataService.getBookById($stateParams.id)
            .then(function (data) {
                vm.currentBook = data;
            });

    }

}());