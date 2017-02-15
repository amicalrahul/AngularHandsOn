(function () {

    var app = angular.module('app', ['ui.router', 'ngCookies', 'common.services']);

    app.provider('books', ['constants', function (constants) {

        var includeVersionInTitle = false;
        this.setIncludeVersionInTitle = function (value) {
            includeVersionInTitle = value;
        };

        this.$get = function () {

            var appName = constants.APP_TITLE;
            var version = constants.APP_VERSION;

            if (includeVersionInTitle) {
                appName += ' ' + version;
            }

            var appDesc = constants.APP_DESCRIPTION;

            return {
                appName: appName,
                appDesc: appDesc
            };
        };

    }]);

    app.config(['booksProvider', 'constants', 'dataServiceProvider', '$urlRouterProvider', '$stateProvider', '$logProvider',
        function (booksProvider, constants, dataServiceProvider, $urlRouterProvider, $stateProvider, $logProvider) {

        booksProvider.setIncludeVersionInTitle(true);
        $logProvider.debugEnabled(false);
        $urlRouterProvider.otherwise("/");
            $stateProvider
           .state('home', {
               url: "/",
               templateUrl: '../../js/bookapp/templates/books.html',
               controller: 'BooksController',
               controllerAs: 'books'
           })
           .state('AddBook', {
               url: "/book/add",
               templateUrl: '../../js/bookapp/templates/addBook.html',
               controller: 'AddBookController',
               controllerAs: 'addBook'
           })
           .state('EditBook', {
               url: "/book/edit/:bookID",
               templateUrl: '../../js/bookapp/templates/editBook.html',
               controller: 'EditBookController',
               controllerAs: 'bookEditor',
               resolve: {
                   books: function (dataService) {
                       //throw 'error getting books';
                       return dataService.getAllBooks();
                   }
               }
           });

        console.log('title from constants service: ' + constants.APP_TITLE);

        console.log(dataServiceProvider.$get);

        app.run(['$rootScope', function ($rootScope) {

            $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {

                console.log('successfully changed routes');

            });

            $rootScope.$on('$routeChangeError', function (event, current, previous, rejection) {

                console.log('error changing routes');

                console.log(event);
                console.log(current);
                console.log(previous);
                console.log(rejection);

            });

        }]);

    }]);

}());