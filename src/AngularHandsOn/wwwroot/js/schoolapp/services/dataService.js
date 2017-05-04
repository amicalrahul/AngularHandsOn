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
                return item.id === id;
            });
            return matchingItems;
        }
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
                    //response.data.forEach(function (classroom, index, array) {
                    //    getSchool(classroom.school_id).then(function (response1) {
                    //        classroom.school = response1;
                    //    })
                    //})
                    return response.data;
                })
                .catch(function (response) {
                    $log.error('Error retrieving classrooms: ' + response.statusText);
                    return $q.reject('Error retrieving classrooms.');
                })
        }

        function getClassroom(id) {
            return $http.get('/Home/GetClassRoom/' + id)
                .then(function (response) {
                    //var classroom = getItemsById(response.data, id)[0];
                    //getSchool(classroom.school_id).then(function (response1) {
                    //    classroom.school = response1;
                    //    //var arr = new Array(2);
                    //    //arr.push(2);
                    //    //arr.push(3);
                    //    //classroom.activities = arr;
                            
                    //})
                    //getActivity(id).then(function (response1) {
                    //    classroom.activities = response1;
                    //    console.log(classroom.activities);
                    //})
                    //return classroom;
                    return response.data;
                })
                .catch(function (response) {
                    $log.error('Error retrieving classroom (' + id + '): ' + response.statusText);
                    return $q.reject('Error retrieving classroom.');
                })
        }
        function getActivity(id) {

            //var deferred = $q.defer();
           return $http.get('GetActivities')
                     .then(function (response1) {
                         var activities = new Array();
                         response1.data.forEach(function (activity, index, array) {
                             if (activity.classroom_id === id) {
                                 activities.push(activity);
                             }
                         });

                         return activities;
                     });

            //return deferred.promise;
            
        }
        function getAllActivities() {

            var deferred = $q.defer();

            $timeout(function () {

                $http.get('GetActivities')
                    .then(function (response) {
                        response.data.forEach(function (activity, index, array) {

                            getClassroom(activity.classroom_id).then(function (response1) {
                                activity.classroom = response1;
                            })
                            getSchool(activity.school_id).then(function (response1) {
                                activity.school = response1;
                            })
                        })
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