
describe("BooksController", function () {
    var controller;
    var books = mockData.getMockBook();
    beforeEach(function () {
        bard.appModule('bookapp');
        bard.inject(this, '$controller', '$log', '$q', '$rootScope', 'dataService');

        //here I am faking the dataService.getAllBooks call
        //to do that I need to return a promise from getAllBooks
        // to return a promise I need to use $q service and return fully resolved promise.
        var ds = {
            getAllBooks: function () {
                return $q.when(books);
            }
        };

        //here i am passing the fake dataservice as ds object.
        // in similar way, i can pass any object to the controller constructor
        controller = $controller('BooksController', {
            dataService: ds
        });
    });
    it("should pass hello test", function () {
        expect(true).to.be.equal(true);
    });
    it("should check if controller exist", function () {
        expect(controller).to.exist;

    });
    it("should check if app name is undefined", function () {
        expect(controller.appName).to.be.undefined;
    });

    it("should check books have empty array before activation", function () {
        expect(controller.allBooks).to.exist;
    });
    it("should check has length above 0 after activation", function () {
        $rootScope.$apply();
        expect(controller.allBooks).to.have.length.above(0);
    });
});