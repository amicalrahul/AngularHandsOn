(function () {

    angular.module('app')
        .controller('HomeController', [HomeController]);

    function HomeController(dataService, notifier, $route, $log) {

        var vm = this;

        vm.message = 'Welcome to School Buddy!';


    }

}());