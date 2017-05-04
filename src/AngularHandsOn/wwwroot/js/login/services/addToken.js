(function () {
    angular.module('loginapp.services')
    .factory('addToken', ['$q', 'currentUser', addToken]);


    function addToken($q, currentUser) {

        function request(config) {
            if (currentUser.profile.loggedIn) {
                config.headers.Authorization = "Bearer " + currentUser.profile.token;
            }
            return $q.when(config);
        }

        return {
            request: request
        }

    }
    angular.module('loginapp.services')
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('addToken');
    }]);
    
}());