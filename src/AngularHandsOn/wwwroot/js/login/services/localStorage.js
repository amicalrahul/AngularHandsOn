(function () {

    var localStorage = function ($window) {

        var store = $window.localStorage;

        var add = function (key, value) {
            value = angular.toJson(value);
            store.setItem(key, value);
        };

        var get = function (key) {
            var value = store.getItem(key);
            if (value) {
                value = angular.fromJson(value);
            }
            return value;
        };

        var remove = function (key) {
            store.removeItem(key);
        };

        return {
            add: add,
            get: get,
            remove: remove
        };
    };


    angular.module('loginapp.services').factory("localStorage", localStorage);

}());