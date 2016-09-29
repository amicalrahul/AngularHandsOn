(function () {
    "use strict";
    var app = angular.module("productManagement", ['ngRoute', 'common.services',
                             "ui.router",
                            "ui.mask",
                            "ui.bootstrap",
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
                    abstract: true,
                    url: "/products/edit/:productId",
                    templateUrl: "../../js/prodmanagmentapp/products/productEditView.html",
                    controller: "ProductEditCtrl as vm",
                    resolve: {
                        productResource: "productResource",

                        product: function (productResource, $stateParams) {
                            var productId = $stateParams.productId;
                            return productResource.get({ productId: productId }).$promise;
                        }
                    }
                })
                    .state("productEdit.info", {
                        url: "/info",
                        templateUrl: "../../js/prodmanagmentapp/products/productEditInfoView.html"
                    })
                    .state("productEdit.price", {
                        url: "/price",
                        templateUrl: "../../js/prodmanagmentapp/products/productEditPriceView.html"
                    })
                    .state("productEdit.tags", {
                        url: "/tags",
                        templateUrl: "../../js/prodmanagmentapp/products/productEditTagsView.html"
                    })
                .state("productDetail", {
                    url: "/products/:productId",
                    templateUrl: "../../js/prodmanagmentapp/products/productDetailView.html",
                    controller: "ProductDetailCtrl as vm",
                    resolve: {
                        productResource: "productResource",

                        product: function (productResource, $stateParams) {
                            var productId = $stateParams.productId;
                            return productResource.get({ productId: productId }).$promise;
                        }
                    }
                })
        ;
    };

}());

