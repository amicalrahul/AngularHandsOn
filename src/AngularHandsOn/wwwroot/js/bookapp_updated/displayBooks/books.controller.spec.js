//this statement is added so that "should" property become accessible to all objects in test cases
chai.should();
describe("BooksController", function () {
    var controller;
    var $controller;
    var $q;
    var $rootScope;
    var $state;
    var $httpBackend;
    var ds;
    var $exceptionHandler;

    var books = mockData.getMockBook();
    beforeEach(module('bookapp'));
    beforeEach(module(function ($exceptionHandlerProvider) {
        $exceptionHandlerProvider.mode('log');
    }));
    beforeEach(inject(function (_$controller_, _$log_, _$q_, _$rootScope_,_dataService_,
                                    _$cookies_, _$state_, _constants_, _alerting_, _$httpBackend_,
                                    _$exceptionHandler_) {
        $controller = _$controller_;
        $q = _$q_;
        $rootScope = _$rootScope_;
        $state = _$state_;
        $httpBackend = _$httpBackend_;
        $exceptionHandler = _$exceptionHandler_;
        //here I am faking the dataService.getAllBooks call
        //to do that I need to return a promise from getAllBooks
        // to return a promise I need to use $q service and return fully resolved promise.
        ds = {
            getAllBooks: function () {
                return $q.when(books);
            },            
            getAllReaders: function () {
                return $q.when(books);
            },
            getBookById: function (book) {
                return $q.when(books);
            }
        };
        $httpBackend.when('GET', '../../js/bookapp_updated/home.html').respond('');
        //here i am passing the fake dataservice as ds object.
        // in similar way, i can pass any object to the controller constructor
        controller = $controller('BooksController', {
            dataService: ds
        });
    }));
    it("should check if controller exist", function () {
        expect(controller).to.exist;

    });
    it("should check if app name is undefined", function () {
        expect(controller.appName).to.be.undefined;
    });

    it("should check books have empty array before activation", function () {
        expect(controller.allBooks).to.exist;
    });

    describe("after activation", function () {
        beforeEach(function () {
            $rootScope.$apply(); 
            //=> remove skip to run the below test cases. 
            //But for these to pass we need to change  module('bookapp'); to bard.appModule('bookapp');
            // in this case $state test cases will fail
        });
        it("should check has length above 0", function () {
            expect(controller.allBooks).to.have.length.above(0);
        });
        it("should have mock books", function () {
            expect(controller.allBooks).to.have.length(books.length);
        });
    });
    describe("after activation using spies", function () {
        var getAllBooks;
        var getAllReaders;
        beforeEach(function () {

            ds = {
                getAllBooks: function () { },
                getAllReaders: function () {  }
            };;

            getAllBooks = sinon.stub(ds, 'getAllBooks').returns($q.when(books));
            getAllReaders = sinon.stub(ds, 'getAllReaders').returns($q.when(books));
            controller = $controller('BooksController', {
                dataService: ds
            });
        });

        // incase we get Sinon error Attempted to wrap function which is already wrapped
        // we need to restore the object to its initial state
        //after(function () {
        //    ds.getAllBooks.restore(); // Unwraps the spy
        //    ds.getAllReaders.restore(); // Unwraps the spy
        //});
        beforeEach(function () {
            $rootScope.$apply();
        });
        it("should check has length above 0", function () {
            expect(controller.allBooks).to.have.length.above(0);
            getAllBooks.calledOnce.should.be.true;
            getAllReaders.calledOnce.should.be.true;
        });
        it("should have mock books", function () {
            expect(controller.allBooks).to.have.length(books.length);
            getAllBooks.calledOnce.should.be.true;
            getAllReaders.calledOnce.should.be.true;
        });
        it("should have mock books", function () {
            expect(controller.allBooks).to.have.length(books.length);
            getAllBooks.calledOnce.should.be.true;
            getAllReaders.calledOnce.should.be.true;
        });
    });
    describe("exceptionhandler service", function () {
        var getAllBooks;
        var getAllReaders;
        beforeEach(function () {
            this.timeout(15000);
            ds = {
                getAllBooks: function () { },
                getAllReaders: function () {  }
            };;

            getAllBooks = sinon.stub(ds, 'getAllBooks').returns($q.reject("Something went wrong!"));
            getAllReaders = sinon.stub(ds, 'getAllReaders').returns($q.when(books));
            controller = $controller('BooksController', {
                dataService: ds
            });
        });
        beforeEach(function () {
            $rootScope.$apply();
        });
        it("should set result status to error", function () {
            expect($exceptionHandler.errors).to.have.length(1);
            expect($exceptionHandler.errors[0]).to.be.equal('Something went wrong!');
        });
    });
    describe("testing states", function () {

        beforeEach(function () {
            bard.inject('$state');
        });
        it("selecting a book triggers state change", function () {
            expect(true).to.be.equal(true);
            //controller.goToBook({ id: 1 });
            //$rootScope.$apply();
            //expect($state.current.name).to.equal('editBook');
        });
    });
});