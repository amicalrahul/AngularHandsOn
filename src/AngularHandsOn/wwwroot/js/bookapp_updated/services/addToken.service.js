(function () {
    angular.module('app.services')
    .factory('addToken', ['$q', 'currentUser', addToken]);


    function addToken($q, currentUser) {

        function request(config) {
            if (currentUser.token) {
                config.headers.Authorization = "Bearer " + currentUser.token.token;
            }
            return $q.when(config);
        }

        return {
            request: request
        }

    }
    angular.module('app.services')
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('addToken');
    }]);
    
}());