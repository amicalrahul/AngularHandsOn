(function () {

    angular.module('app')
        .constant('constants', {
            APP_TITLE: 'Book Logger',
            APP_DESCRIPTION: 'Track which books you read.',
            APP_VERSION: '1.0',
            readersArray: [
                {
                    reader_id: 1,
                    name: 'Marie',
                    weeklyReadingGoal: 315,
                    totalMinutesRead: 5600
                },
                {
                    reader_id: 2,
                    name: 'Daniel',
                    weeklyReadingGoal: 210,
                    totalMinutesRead: 3000
                },
                {
                    reader_id: 3,
                    name: 'Lanier',
                    weeklyReadingGoal: 140,
                    totalMinutesRead: 600
                }
            ]
        });

}());