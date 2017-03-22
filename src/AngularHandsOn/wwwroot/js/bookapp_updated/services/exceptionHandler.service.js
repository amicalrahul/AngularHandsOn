(function () {
    var app = angular.module('app.services');

   app.config(['$provide', appConfig]);

    function appConfig($provide) {
        //decorator created using $provide service
        // it wraps the service and you can add your own custom code
        // inside the wrapper.
        //Basically, you are creating a wrapper, returnig a wrapped function similar to actual wrapped service
        //inside the function, you call $delegate() method to call the actual service. and then you write your own cutom code
        // as I have wrapped $exceptionHandler service that return a function with 2 parameters exception, cause
        // my custom code call alerting service to add the danger alert
        //=> alerting service is not injected using dependency injection as that would result in circular dependency
        // it'll be like exceptionHandler calling alerting that againg caling exception handler
        //==> so to overcome this, $injector service is used to get the instance of alerting service.
        $provide.decorator('$exceptionHandler', function ($delegate, $injector) {
            return function (exception, cause) {
                $delegate(exception, cause);
                var alertingService = $injector.get('alerting');
                alertingService.addDanger(exception.message);
            }
        });
    }

}());