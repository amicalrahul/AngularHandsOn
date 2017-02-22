(function () {
    "use strict";
    var app = angular.module('bookapp');

    app.directive('appDirective1', appDirective1);
    app.directive('appDirective2', appDirective2);
    app.directive('appDirective3', appDirective3);
    app.directive('appDirective4', appDirective4);

    //<div app-Directive1="some string" another-param="another string"></div>
    function appDirective1() {
        return {
            link: function (scope, element, attributes) {

                console.log(attributes.appDirective1);
                console.log(attributes.anotherParam);

            }
        };
    }
    
    //<div app-Directive2="{{somestring}}" another-param="another string"></div>
    function appDirective2() {
        return {
            link: function (scope, element, attributes) {

                console.log(attributes.appDirective2); //literal string "{{some string}}", no interpolation
                console.log(attributes.anotherParam); //literally "another string"

                attributes.$observe('appDirective2', function (value) {
                    console.log(value);
                });

                attributes.$observe('anotherParam', function (value) {
                    console.log(value);
                });

            }
        };
    }
    
    //<div app-Directive3="vm" another-param="vm.allBooks"></div>
    function appDirective3() {
        return {
            link: function (scope, element, attributes) {

                console.log(attributes.anotherParam); //literally "modelObject.obj"

                //modelObject is a scope property of the parent/current scope
                scope.$watch(attributes.appDirective3, function (value) {
                    console.log(value);
                });

                //modelObject.obj is also a scope property of the parent/current scope
                scope.$watch(attributes.anotherParam, function (value) {
                    console.log(value);
                });

                //if you tried to use $observe, you would get the literal expression "modelObject" and "modelObject.obj", because there's nothing to interpolate

            }
        };
    }
    
    //<div app-Directive4="{ param: 34, param2: 'cool' }" another-param="another string"></div>
    function appDirective4() {
        return {
            link: function (scope, element, attributes) {

                //this is designed for directive configuration if there's a alot of configuration parameters
                //one can combine this with interpolation, if the configuration is a JSON string
                var obj = scope.$eval(attributes.appDirective4);
                //can also fallback as a string
                var string = scope.$eval(attributes.anotherParam);

                console.log(obj);
                console.log(string);

            }
        };
    }
}());