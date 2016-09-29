/// <reference path="templates/home.html" />
(function () {
    "use strict";
    var app = angular.module('schoolBuddies', ['ngRoute']);

    app.config(['$logProvider', '$routeProvider', '$locationProvider', configSection]);

    function configSection($logProvider, $routeProvider, $locationProvider) {

        $logProvider.debugEnabled(true);

        $routeProvider
            .when('/', {
                templateUrl: '../../js/schoolapp/templates/home.html',
                controller: 'HomeController',
                controllerAs: 'home'
            })
            .when('/schools', {
                controller: 'AllSchoolsController',
                controllerAs: 'schools',
                templateUrl: '../../js/schoolapp/templates/allSchools.html'
            })
            .when('/classrooms', {
                controller: 'AllClassroomsController',
                controllerAs: 'classrooms',
                templateUrl: '../../js/schoolapp/templates/allClassrooms.html'
            })
            .when('/activities', {
                controller: 'AllActivitiesController',
                controllerAs: 'activities',
                templateUrl: '../../js/schoolapp/templates/allActivities.html',
                resolve: {
                    activities: function (dataService) {
                        return dataService.getAllActivities();
                    }
                }
            })
            .when('/classrooms/:id', {
                templateUrl: '../../js/schoolapp/templates/classroom.html',
                controller: 'ClassroomController',
                controllerAs: 'classroom'
            })
            .when('/classrooms/:id/detail/:month?', {
                templateUrl: '../../js/schoolapp/templates/classroomDetail.html',
                controller: 'ClassroomController',
                controllerAs: 'classroom'
            })
           .otherwise('/');
    };

    app.run(['$rootScope', '$log', function ($rootScope, $log) {

        $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {

            $log.debug('successfully changed routes');

            $log.debug(event);
            $log.debug(current);
            $log.debug(previous);

        });

        $rootScope.$on('$routeChangeError', function (event, current, previous, rejection) {

            $log.debug('error changing routes');

            $log.debug(event);
            $log.debug(current);
            $log.debug(previous);
            $log.debug(rejection);

        });

    }]);
}());

