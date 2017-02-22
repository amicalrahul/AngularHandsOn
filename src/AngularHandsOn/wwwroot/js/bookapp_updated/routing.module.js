(function () {
    angular.module('bookApp.routing', ['ui.router']);

    angular.module('bookApp.routing').config(['$urlRouterProvider', '$stateProvider', config]);

    function config($urlRouterProvider, $stateProvider) {

        $urlRouterProvider.otherwise('/');
        $stateProvider
           .state('home', {
               url: "/",
               templateUrl: '../../js/bookapp_updated/displayBooks/books.html',
               controller: 'BooksController',
               controllerAs: 'vm'
           })
           .state('editBook', {
               url: "/editbook/:id",
               templateUrl: '../../js/bookapp_updated/editbooks/editbook.html',
               controller: 'EditBooksController',
               controllerAs: 'vm'
           });

    }

}());