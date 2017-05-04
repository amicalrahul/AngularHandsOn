(function () {
    var app = angular.module('app.services');

    app.factory('requestCounter', requestCounter);

    app.config(['$httpProvider', config]);

    function config($httpProvider) {
        $httpProvider.interceptors.push('requestCounter');
    }

    function requestCounter($q) {
        var requests = 0;
        var request = function (config) {
            requests += 1;
            return $q.when(config);
        }
        var requestError = function (config) {
            requests -= 1;
            return $q.reject(config);
        }
        var response = function (config) {
            requests -= 1;
            return $q.when(config);
        }
        var responseError = function (config) {
            requests -= 1;
            return $q.reject(config);
        }

        var getRequestCount = function () {
            return requests;
        }

        return {
            request: request,
            requestError: requestError,
            response: response,
            responseError: responseError,
            getRequestCount: getRequestCount

        }
    }
}());