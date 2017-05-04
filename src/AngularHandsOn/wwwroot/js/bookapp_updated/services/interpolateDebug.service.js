(function () {
    var app = angular.module('app.services');

    app.config(['$provide', appConfig]);

    function appConfig($provide) {
        $provide.decorator("$interpolate", function ($delegate, $log) {

            var serviceWrapper = function () {
                var bindingFunction = $delegate.apply(this, arguments);
                if (angular.isFunction(bindingFunction) && arguments[0]) {
                    return bindingWrapper(bindingFunction, arguments[0].trim());
                }
                return bindingFunction;
            };

            var bindingWrapper = function (bindingFunction, bindingExpression) {
                return function () {
                    var result = bindingFunction.apply(this, arguments);
                    var trimmedResult = result.trim();
                    var log = trimmedResult ? $log.info : $log.warn;
                    if (log === $log.warn)
                        log.call($log, bindingExpression + " = " + trimmedResult);
                    return result;
                };
            };

            angular.extend(serviceWrapper, $delegate);
            return serviceWrapper; 
        });

        }

}());