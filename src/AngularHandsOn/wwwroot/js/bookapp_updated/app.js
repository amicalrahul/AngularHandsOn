(function(){
    angular.module('bookapp', ['ui.router','ngResource']);

    angular.module('bookapp').config(['$urlRouterProvider', '$stateProvider', config]);

    function config($urlRouterProvider, $stateProvider) {

        $urlRouterProvider.otherwise('/');
        $stateProvider
           .state('home', {
               url: "/",
               templateUrl: '../../js/bookapp_updated/displayBooks/books.html',
               controller: 'BooksController',
               controllerAs: 'vm'
           });

    }
    

}());