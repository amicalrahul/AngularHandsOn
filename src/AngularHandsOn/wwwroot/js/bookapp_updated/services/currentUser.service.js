(function () {
    angular.module('app.services')
    .factory("currentUser", currentUser);

    function currentUser() {
        return {
            token:''
        };
    }

}());