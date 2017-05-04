/// <reference path="templates/home.html" />
(function () {
    "use strict";
    var app = angular.module('ngdirective', ['ngRoute', 'ui.bootstrap']);

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

    app.controller('mainCtrl', function ($scope) {
        $scope.person1 = {
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
            level: 0,
            hasForce: true,
            yearsOfJediTraining: 4,
            master: 'Yoda',
            passedTrials: true,
            masterApproves: true
        }
        $scope.person2 = {
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
        $scope.droid1 = {
            name: 'R2-D2',
            specifications: {
                manufacturer: 'Industrial Automaton',
                type: 'Astromech',
                productLine: 'R2 series'
            },
            level: 1
            // owners...etc
        }
        $scope.messages = [];

        $scope.handlePause = function (e) {
            console.log(e);
            $scope.messages.push({ text: 'paused!' });
            console.log('paused!');
        }
    });

    app.factory('jediPolicy', function ($q) {
        return {
            advanceToKnight: function (candidate) {
                var promise = $q(function (resolve, reject) {
                    if (candidate.hasForce &&
                    (
                      candidate.yearsOfJediTraining > 20
                      || candidate.isChosenOne
                      || (candidate.master === 'Yoda' && candidate.yearsOfJediTraining > 3)
                    )
                    && candidate.masterApproves
                    && candidate.passedTrials) {
                        resolve(candidate);
                    } else {
                        reject(candidate);
                    }
                });
                return promise;
            }
        }
    });

    app.controller('knightConfirmationCtrl', function ($scope, $modalInstance, user) {
        $scope.user = user;

        $scope.yes = function () {
            $modalInstance.close(true);
        }

        $scope.no = function () {
            $modalInstance.close(false);
        }
    });
    app.directive('userPanel', function () {
        return {
            restrict: 'E',
            transclude: true,
            templateUrl: '../../js/ngdirectiveapp/userPanel.html',
            scope: {
                name: '@',
                level: '=',
                initialCollapsed: '@collapsed'
            },
            controller: function ($scope) {
                $scope.collapsed = ($scope.initialCollapsed === 'true');

                $scope.nextState = function (evt) {
                    evt.stopPropagation();
                    evt.preventDefault();
                    $scope.level++;
                    $scope.level = $scope.level % 4;
                }
                $scope.collapse = function () {
                    $scope.collapsed = !$scope.collapsed;
                }
            }
        }
    })
    app.directive('droidInfoCard', function () {
        return {
            templateUrl: "../../js/ngdirectiveapp/droidInfoCard.html",
            restrict: "E",
            scope: {
                droid: '=',
                initialCollapsed: '@collapsed'
            },
            controller: function ($scope) {

            }
        }
    });
    app.directive('personInfoCard', function (jediPolicy) {
        return {
            templateUrl: "../../js/ngdirectiveapp/personInfoCard.html",
            restrict: "E",
            scope: {
                person: '=',
                initialCollapsed: '@collapsed'
            },
            controller: function ($scope, $modal) {
                //$scope.knightMe = function (person) {
                //    person.rank = "knight";
                //}

                //$scope.knightMe = function (user) {
                //    jediPolicy.advanceToKnight(user).then(null, function (user) {
                //        alert('Sorry, ' + user.name + ' is not ready to become a Jedi Knight');
                //    })
                //}

                $scope.knightMe = function (user) {
                    jediPolicy.advanceToKnight(user).then(advance, function (user) {
                            alert('Sorry, ' + user.name + ' is not ready to become a Jedi Knight');
                        })
                }

                function advance(user) {
                    var modalInstance = $modal.open({
                        templateUrl: '../../js/ngdirectiveapp/knightConfirmation.html',
                        controller: 'knightConfirmationCtrl',
                        resolve: {
                            user: function () {
                                return $scope.person;
                            }
                        }
                    })

                    modalInstance.result.then(function (answer) {
                        if (answer) {
                            $scope.person.rank = "Jedi Knight";
                        }
                    })
                }

                $scope.removeFriend = function (friend) {
                    var idx = $scope.person.friends.indexOf(friend);
                    if (idx > -1) {
                        $scope.person.friends.splice(idx, 1);
                    }
                }
            }
        }
    });
    app.directive('stateDisplay', function () {
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
    app.directive('eventPause', function ($parse) {
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
    app.directive('spacebarSupport', function () {
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
    
    app.directive('removeFriend', function () {
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

    app.directive('address', function () {
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

