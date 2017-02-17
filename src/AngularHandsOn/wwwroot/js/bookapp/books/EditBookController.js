(function () {

    angular.module('app')
        .controller('EditBookController', ['$stateParams', 'books', '$cookies', '$cookieStore', "bookResource", EditBookController]);

    function EditBookController($stateParams, books, $cookies, $cookieStore, bookResource) {
        //console.log($stateParams.bookID);

        var vm = this;

        //dataService.getAllBooks()
        //    .then(function(books) {
        //        vm.currentBook = books.filter(function(item) {
        //            return item.book_id == $stateParams.bookID;
        //        })[0];
        //    });

        //vm.currentBook = books.filter(function(item) {
        //    return item.book_id == $stateParams.bookID;
        //})[0];

        vm.setAsFavorite = function() {

            $cookies.favoriteBook = vm.currentBook.title;

        };

        $cookieStore.put('lastEdited', vm.currentBook);


        vm.currentBook = bookResource.get({ book_id: $stateParams.bookID });
    };

    }

());