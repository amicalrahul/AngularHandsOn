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
            ],
            level: 0
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
            ],
            level: 1
        }
        $scope.messages = [];

        $scope.handlePause = function (e) {
            console.log(e);
            $scope.messages.push({ text: 'paused!' });
            console.log('paused!');
        }
    });

    angular.module('ngdirective').directive('stateDisplay', function () {
        return {
            link: function (scope, el, attrs) {
                var parms = attrs['stateDisplay'].split(' ');
                var linkVar = parms[0];
                var classes = parms.slice(1);

                scope.$watch(linkVar, function (newVal) {
                    el.removeClass(classes.join(' '));
                    el.addClass(classes[newVal]);
                });
            }
        }
    })
    angular.module('ngdirective').directive('eventPause', function ($parse) {
        return {
            restrict: 'A',
            link: function (scope, el, attrs) {
                var fn = $parse(attrs['eventPause']);
                el.on('pause', function (event) {
                    scope.$apply(function () {
                        fn(scope, { evt: event })
                    })
                })
            }
        }
    })
    angular.module('ngdirective').directive('spacebarSupport', function () {
        return {
            restrict: 'A',
            link: function (scope, el, attrs) {
                $('body').on('keypress', function (evt) {
                    var vidEl = el[0];
                    if (evt.keyCode === 32) {
                        if (vidEl.paused) {
                            vidEl.play();
                        } else {
                            vidEl.pause();
                        }
                    }
                })
            }
        }
    })

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
                $scope.nextState = function () {
                    $scope.user.level++;
                    $scope.user.level = $scope.user.level % 4;
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

