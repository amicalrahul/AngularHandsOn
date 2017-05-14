describe("BookTitle Directive", function () {
    beforeEach(module('bookapp'));
    var $compile;
    var $rootScope;
    beforeEach(inject(function (_$compile_, _$rootScope_, _$httpBackend_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        _$httpBackend_.when('GET', '../../js/bookapp_updated/home.html').respond('');
    }));

    var books = mockData.getMockBook();

    it("should display book title as html", function () {
        $rootScope.book = books[0];
        var expectedHtml = '<div class="ng-binding">Goodnight Moon - Margaret Wise Brown<span ng-transclude=""></span></div>';
        var element = $compile('<book-title book="book"></book-title>')($rootScope);
        $rootScope.$digest();
        expect(element.html()).to.be.equal(expectedHtml);
    });
});