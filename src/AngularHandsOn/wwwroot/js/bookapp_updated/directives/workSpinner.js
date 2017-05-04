(function () {
    "use strict";
    var app = angular.module('app.directive');

    app.directive('workSpinner', workSpinner);

    function workSpinner(requestCounter) {
        return {
            restrict: "AE",
            scope: {},
            transclude: true,
            template: "<ng-transclude ng-show='requestCount'></ng-transclude>",
            link: function (scope) {
                scope.$watch(function () {
                   return requestCounter.getRequestCount()
                }, function (requestCount) {
                    scope.requestCount = requestCount;
                });

            }


        }
    }

}());