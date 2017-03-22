(function () {
    "use strict";
    angular.module('app.directive', []);
    var app = angular.module('app.directive');

    app.directive("alerts", alerts);

    function alerts(alerting) {
        return {
            restrinct:"AE",
            templateUrl: "../../js/bookapp_updated/templates/alerts.html",
            scope:true,
            controller:function($scope)
            {
                $scope.removeAlert = removeAlert;


                function removeAlert(alert){
                    alerting.removeAlert(alert);
                }

            },
            link: function (scope) {
                scope.currentAlerts = alerting.currentAlerts;
            }

        };
    };

}());