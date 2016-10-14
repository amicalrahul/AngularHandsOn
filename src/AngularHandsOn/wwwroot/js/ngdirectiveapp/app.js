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
        $scope.user1 = {
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
        $scope.user2 = {
            name: 'Han Solo',
            address: {
                street: 'PO Box 123',
                city: 'Mos Eisley',
                planet: 'Tattoine'
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
            restrict: "E",
            scope: {
                user: '=',
                initialCollapsed: '@collapsed'
            },
            controller: function ($scope) {
                $scope.collapsed = ($scope.initialCollapsed === 'true');
                $scope.knightMe = function (user) {
                    user.rank = "knight";
                }
                $scope.collapse = function () {
                    $scope.collapsed = !$scope.collapsed;
                }

                $scope.removeFriend = function (friend) {
                    var idx = $scope.user.friends.indexOf(friend);
                    if (idx > -1) {
                        $scope.user.friends.splice(idx, 1);
                    }
                }
            }
        }
    });

    angular.module('ngdirective').directive('removeFriend', function () {
        return {
            restrict: 'E',
            templateUrl: '../../js/ngdirectiveapp/removeFriend.html',
            scope: {
                notifyParent: '&method'
            },
            controller: function ($scope) {
                $scope.removing = false;
                $scope.startRemove = function () {
                    $scope.removing = true;
                }
                $scope.cancelRemove = function () {
                    $scope.removing = false;
                }
                $scope.confirmRemove = function () {
                    $scope.notifyParent();
                }

            }
        }
    })

    angular.module('ngdirective').directive('address', function () {
        return {
            restrict: 'E',
            scope: true,
            templateUrl: '../../js/ngdirectiveapp/address.html',
            controller: function ($scope) {
                $scope.collapsed = false;
                $scope.collapseAddress = function () {
                    $scope.collapsed = true;
                }
                $scope.expandAddress = function () {
                    $scope.collapsed = false;
                }
            }
        }
    })
}());

