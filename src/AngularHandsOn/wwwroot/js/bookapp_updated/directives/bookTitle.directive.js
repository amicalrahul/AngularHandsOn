(function () {

    var app = angular.module("app.directive");

    app.directive("bookTitle", [bookTitle]);

    function bookTitle() {
        return {
            restrict: 'E',
            scope: {
                book:'=book'
            },
            transclude: true,
            template: '<div>{{ book.title }} - {{ book.author }}<span ng-transclude></span></div>'
        }

    }
})();