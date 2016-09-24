(function () {
    "use strict";
    var app = angular.module("productManagement", ['ngRoute', 'common.services',
                             "productResourceMock"]);
    app.config(['$routeProvider', configSection]);

    function configSection($routeProvider) {
        $routeProvider
           .when('/', {
               templateUrl: '../../js/prodmanagmentapp/startpage.html',
               controller: 'ProductListCtrl'
           })
           .otherwise('/');
    };

}());

