(function () {
    angular.module('app.diagnostic', []);

    angular.module('app.diagnostic')
    .controller('ErrorProneController', ['alerting', ErrorProneController]);

    function ErrorProneController(alerting) {
        var vm = this;
        vm.createAlert = createAlert;
        vm.createException = createException;
        resetForm();

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