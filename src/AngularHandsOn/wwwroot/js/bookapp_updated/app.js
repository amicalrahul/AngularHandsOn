(function(){
    angular.module('bookapp',
        [
            'permission',
            'permission.ui',
            'app.diagnostic',
            'app.directive',
            'bookApp.routing',
            'common.services',
            'loginapp.services',
            'app.services',
            'app.login',
            'ngResource',
            'ngCookies'
        ]);
    
    angular.module('bookapp')
        .run(['$rootScope', 'alerting', 'PermPermissionStore', 'PermRoleStore', appRun]);

    function appRun($rootScope, alerting, PermPermissionStore, PermRoleStore) {
        PermPermissionStore
             .definePermission('canViewBooks', function () {
                 return true;
             });
        PermRoleStore
              // Permission array validated role
              // Library will internally validate if 'listEvents' and 'editEvents' permissions are valid when checking if role is valid   
              .defineRole('ADMIN', ['listEvents', 'editEvents']);

        PermRoleStore
              // Or use your own function/service to validate role
              .defineRole('USER', /*@ngInject*/ function (Session) {
                  return Session.checkSession();
              });

        var role = PermRoleStore.getRoleDefinition('roleName');
        var permissions = PermPermissionStore.getPermissionDefinition('permissionName');
        $rootScope.$on("$stateChangeError", function (event, toState, toParams,
                                                       fromState, fromParams, error) {
            alerting.addDanger("Could not load " + toState.name);
        });
    }
}());