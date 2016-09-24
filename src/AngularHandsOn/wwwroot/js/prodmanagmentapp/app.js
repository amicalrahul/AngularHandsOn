(function () {
    "use strict";
    var app = angular.module("productManagement", ['ngRoute', 'common.services',
                             "ui.router",
                             "productResourceMock"]);
    app.config(["$stateProvider",
                "$urlRouterProvider", configSection]);

    function configSection($stateProvider, $urlRouterProvider) {
        //$routeProvider
        //   .when('/', {
        //       templateUrl: '../../js/prodmanagmentapp/startpage.html',
        //       controller: 'ProductListCtrl'
        //   })
        //   .otherwise('/');
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state("home",
            {
                url: "/",
                templateUrl: "../../js/prodmanagmentapp/welcomeView.html"
            })
        // Products
                .state("productList", {
                    url: "/products",
                    templateUrl: "../../js/prodmanagmentapp/products/productListView.html",
                    controller: "ProductListCtrl as vm"
                })
                .state("productEdit", {
                    url: "/products/edit/:productId",
                    templateUrl: "../../js/prodmanagmentapp/products/productEditView.html",
                    controller: "ProductEditCtrl as vm"
                });
    };

}());

