/// <reference path="startpage.html" />c:\ember\angularhandson\src\angularhandson\wwwroot\js\prodmanagmentapp\
(function () {
    "use strict";
    var app = angular.module("productManagement", ['ngRoute',"common.services",
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

