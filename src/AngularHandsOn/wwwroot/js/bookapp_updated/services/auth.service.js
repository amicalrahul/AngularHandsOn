(function () {

    angular.module('app.services')
        .factory('authService', ['$http', '$q', 'currentUser', authService]);

    function authService($http, $q, currentUser) {
        var authUrl = '/api/auth/token';

        return {
            getAuthToken: getAuthToken
        };
        function getAuthToken(username, password) {


            return $http.post(authUrl, { "UserName": username, "Password": password })
            .then(success)
            .catch(error);
        }
        function success(response) {
            console.log(response.data);
            currentUser.token = response.data;
            return response.data;
        }
        function error(e) {
            console.log(e.data);
        }


    }
}());