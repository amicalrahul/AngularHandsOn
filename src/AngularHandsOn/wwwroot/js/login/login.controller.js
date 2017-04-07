(function () {
    angular.module('app.login', [
                                'loginapp.services',
                                'common.services']);

    angular.module('app.login')
    .controller('LoginController', ['authService', 'currentUser', 'alerting', 'loginRedirect', LoginController]);

    function LoginController(authService, currentUser, alerting, loginRedirect) {
        var vm = this;
        vm.username;
        vm.password;
        var token;
        vm.login = login;

        function login(form) {
            if (form.$valid) {
                authService.login(vm.username, vm.password)
                     .then(function () {
                         loginRedirect.redirectPostLogin();
                     })
                     .catch(alerting.errorHandler("Could not login"));
                vm.password = vm.username = "";
                form.$setUntouched();
            }
        }
    }

}());