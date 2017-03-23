(function () {

    var app = angular.module("app.directive");

    app.directive("myRating", myRating);

    function myRating(){
        return{
            restrict:"E",
            scope:{
                value:"="
            },
            link: function(scope, element, attributes){
                var min = parseInt(attributes.min || "1");
                var max = parseInt(attributes.max || "5");

                scope.$watch("value", function(newValue){
                    element.empty();
                    for (var i = 0; i < newValue; i++) {
                        element.append("<button class='btn btn-default btn-xs'><span class='glyphicon glyphicon-star'></span></button>");
                    }
                });

                element.on("click", function () {
                    scope.$apply(function () {
                        if (scope.value < max) {
                            scope.value += 1;
                        }
                        else {
                            scope.value = min;
                        }

                    });

                })

            }

        }
    }
}());