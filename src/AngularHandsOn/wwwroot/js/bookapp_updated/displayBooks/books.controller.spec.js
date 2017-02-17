
describe("booksController", function () {
    beforeEach(function () {
        bard.appModule('bookapp');
        bard.inject(this, '$controller');
    });
    it("should check if controller exist", function () {
        var controller = $controller('booksController');
        expect(controller).to.exist;
        expect(controller.appName).to.be.equal("Books");

    });
    it("should pass hello test", function () {
        expect(true).to.be.equal(true);
    });

});