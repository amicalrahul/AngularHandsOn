/**
 * Created by Deb on 8/21/2014.
 */
(function () {
    "use strict";

    angular
        .module("common.services")
        .factory("productResource",
                ["$resource",
                 productResource]);

    function productResource($resource) {
        return $resource("../../api/products/:productId");
    }

}());

(function () {
    "use strict";

    angular
        .module("common.services")
        .factory("bookResource",
                ["$resource",
                 bookResource]);

    function bookResource($resource) {
        return $resource("../../api/books1:book_id");
    }
}());