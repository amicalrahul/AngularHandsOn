(function () {
    angular.module('app.login', []);

    angular.module('app.login')
    .controller('LoginController', ['authService', '$state', LoginController]);

    function LoginController(authService, $state) {
        var vm = this;
        vm.username;
        vm.password;
        var token;
        vm.login = login;

        function login()
        {
            authService.getAuthToken(vm.username, vm.password)
            .then(function (data) {
                token = data;
                if (token) {
                    $state.go('books');
                }
            });
        }
    }

}());