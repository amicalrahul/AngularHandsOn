(function () {

    angular.module('app.services')
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
            ],
            retrieveBadge: retrieveBadge

        });
    function retrieveBadge(minutesRead) {

        var badge = null;

        switch (true) {

            case (minutesRead > 5000):
                badge = 'Book Worm';
                break;
            case (minutesRead > 2500):
                badge = 'Page Turner';
                break;
            default:
                badge = 'Getting Started';
        }

        return badge;

    }
}());