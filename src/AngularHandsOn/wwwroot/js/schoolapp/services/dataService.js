(function () {

    angular.module('schoolBuddies')
        .factory('dataService', ['$http', '$q', '$log', '$timeout', dataService]);

    function dataService($http, $q, $log, $timeout) {

        return {
            getAllSchools: getAllSchools,
            getAllClassrooms: getAllClassrooms,
            getAllActivities: getAllActivities,
            getClassroom: getClassroom,
            getMonthName: getMonthName
        };
        function getItemsById(data, id) {

            var matchingItems = data.filter(function (item) {
                return item.id == id;
            });
            return matchingItems;
        };
        function getAllSchools() {
            return $http.get('/Home/GetSchools')
                .then(function (response) {
                    return response.data;
                })
                .catch(function (response) {
                    $log.error('Error retrieving schools: ' + response.statusText);
                    return $q.reject('Error retrieving schools.');
                })
        }
        function getSchool(id) {
            return $http.get('GetSchools')
                .then(function (response) {
                    return getItemsById(response.data, id)[0];
                })
                .catch(function (response) {
                    $log.error('Error retrieving classroom (' + id + '): ' + response.statusText);
                    return $q.reject('Error retrieving classroom.');
                })
        }
        function getAllClassrooms() {
            return $http.get('/Home/GetClassrooms')
                .then(function (response) {
                    response.data.forEach(function (classroom, index, array) {
                        console.log(getSchool(classroom.school_id));
                        classroom.school = getSchool(classroom.school_id);
                    })
                    return response.data;
                })
                .catch(function (response) {
                    $log.error('Error retrieving classrooms: ' + response.statusText);
                    return $q.reject('Error retrieving classrooms.');
                })
        }

        function getClassroom(id) {
            return $http.get('GetClassrooms')
                .then(function (response) {
                    return getItemsById(response.data, id)[0];
                })
                .catch(function (response) {
                    $log.error('Error retrieving classroom (' + id + '): ' + response.statusText);
                    return $q.reject('Error retrieving classroom.');
                })
        }

        function getAllActivities() {

            var deferred = $q.defer();

            $timeout(function () {

                $http.get('GetActivities')
                    .then(function (response) {
                        deferred.resolve(response.data);
                    })
                    .catch(function (response) {
                        $log.error('Error retrieving activities: ' + response.statusText);
                        return $q.reject('Error retrieving activities.');
                    });

            }, 1000);

            return deferred.promise;

        }

        function getMonthName(month) {

            var monthNames = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];

            return monthNames[month - 1];
        }

    }

}());