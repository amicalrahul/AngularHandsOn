(function () {
    angular.module('app.diagnostic', []);

    angular.module('app.diagnostic')
    .controller('ErrorProneController', ['alerting', '$http', ErrorProneController]);

    function ErrorProneController(alerting, $http) {
        var vm = this;
        vm.createAlert = createAlert;
        vm.createException = createException;
        resetForm();
        $http.get('/api/home1/Books/delayed');


        $http.get('/api/home1/Books22')
            .then(function () {

            })
            .catch(
            alerting.errorHandler("Failed To Load data!!")
            );
        function resetForm() {
            vm.alertMessage = "";
            vm.alertTypes = alerting.alertTypes;
            vm.alertType = alerting.alertTypes[0];
        }

        function createAlert(){
            alerting.addAlert(vm.alertType, vm.alertMessage);
            resetForm();
        }

        function createException() {
            throw new Error("something went wrong.");
        }

    }

}());