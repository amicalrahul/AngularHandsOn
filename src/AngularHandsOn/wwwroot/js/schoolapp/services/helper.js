(function () {
    "use strict";

    angular
        .module("schoolBuddies")
        .factory("helper", ['$q', helper]);
    function helper($q)
    {
        return
        {
            getItemsById: getItemsById;
        }
        function getItemsById(data, id) {

            var matchingItems = data.filter(function (item) {
                return item.id == id;
            });
            return matchingItems;
        };
    }

}());
