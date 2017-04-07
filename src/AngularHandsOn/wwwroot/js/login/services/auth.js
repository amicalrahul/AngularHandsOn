(function () {

    angular.module('loginapp.services')
        .factory('authService', ['$http', '$q', 'currentUser', authService]);

    function authService($http, $q, currentUser) {
        var authUrl = '/api/auth/token';

        return {
            login: login
        };
        function login(username, password) {


            return $http.post(authUrl, { "UserName": username, "Password": password })
            .then(function (response) {
                currentUser.setProfile(username, response.data.token);
                return username;
            })
            .catch(error);
        }
        //function success(response) {
        //    console.log(response.data);
        //    //currentUser.token = response.data;
        //    return response.data;
        //}
        function error(e) {
            console.log(e.data);
        }


    }
}());