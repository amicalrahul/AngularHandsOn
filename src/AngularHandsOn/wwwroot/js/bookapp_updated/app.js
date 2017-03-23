(function(){
    angular.module('bookapp',
        [
            'app.diagnostic',
            'app.directive',
            'bookApp.routing',
            'app.services',
            'app.login',
            'ngResource', 
        ]);
    
    angular.module('bookapp').run(['$rootScope', 'alerting', function ($rootScope, alerting) {
        $rootScope.$on("$stateChangeError", function (event, toState, toParams,
                                                       fromState, fromParams, error) {
            alerting.addDanger("Could not load " + toState.name);
        });
    }])
}());