/// <reference path="templates/home.html" />
(function () {
    "use strict";
    var app = angular.module('ngdirective', ['ngRoute']);

    app.config(['$logProvider', '$routeProvider', '$locationProvider', configSection]);

    function configSection($logProvider, $routeProvider, $locationProvider) {

        $logProvider.debugEnabled(true);

        $routeProvider
            .when('/', {
                templateUrl: '../../js/ngdirectiveapp/index.html',
                controller: 'mainCtrl'
            })
           .otherwise('/');
    };

    angular.module('ngdirective').controller('mainCtrl', function ($scope) {
        $scope.user = {
            name: 'Luke Skywalker',
            address: {
                street: 'PO Box 123',
                city: 'Secret Rebel Base',
                planet: 'Yavin 4'
            },
            friends: [
              'Han',
              'Leia',
              'Chewbacca'
            ]
        }
    });

    angular.module('ngdirective').directive('userInfoCard', function () {
        return {
            templateUrl: "../../js/ngdirectiveapp/userInfoCard.html",
            restrict: "E"
        }
    })

}());

