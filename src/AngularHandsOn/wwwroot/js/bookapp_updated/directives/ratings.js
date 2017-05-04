(function () {

    var app = angular.module("app.directive");

    app.directive("myRating", myRating);
    app.controller("RatingsController", RatingsController);

    function myRating(){
        return {
            require:"myRating",
            restrict: "E",
            templateUrl:"../../js/bookapp_updated/templates/ratings.html",
            scope:{
                value:"="
            },
            controller: "RatingsController",
            link: function(scope, element, attributes, controller){
                var min = parseInt(attributes.min || "1");
                var max = parseInt(attributes.max || "10");

                controller.initialize(min, max);
            }

        }
    }

    function RatingsController($scope) {
        this.initialize = function (min, max) {
            $scope.preview = -1;
            $scope.stars = new Array(max - min + 1);
        };

        $scope.click = function ($index) {
            $scope.value = $index + 1;
        };

        $scope.mouseover = function ($index) {
            $scope.preview = $index;
        }
        $scope.mouseout = function ($index) {
            $scope.preview = -1;
        }
        $scope.styles = function ($index) {
            return {
                "glyphicon": true,
                "glyphicon-star": $index < $scope.value,
                "glyphicon-star-empty": $index >= $scope.value,
                "starpreview": $index <= $scope.preview
            };
        }
    }
}());