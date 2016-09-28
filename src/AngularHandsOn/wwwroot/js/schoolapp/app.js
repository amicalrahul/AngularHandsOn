/// <reference path="templates/home.html" />
(function () {
    "use strict";
    var app = angular.module("schoolBuddies", ['ngRoute']);
    app.config(['$logProvider', '$routeProvider', configSection]);

    function configSection($logProvider, $routeProvider) {

        $logProvider.debugEnabled(true);

        $routeProvider
            .when('/',
            {
                controller: 'HomeController',
                controllerAs: 'home',
                templateurl: '../../js/schoolapp/templates/home.html'
            });
    };

}());

