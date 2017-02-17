﻿
describe("dataService", function () {
    beforeEach(function () {
        bard.appModule('bookapp');
        bard.inject(this, '$http', '$httpBackend', '$q', 'dataService', '$rootScope');
    });
    it("should pass hello test", function () {
        expect(true).to.be.equal(true);
    });
    it("exist", function () {
        expect(dataService).to.exist;
    });
    it("get books return an array", function () {
        $httpBackend.when('GET', '/api/home1/Books').respond(200);
        dataService.getAllBooks().then(function (data) {
            expect(data).to.undefined;
        });
        // here we are making server call so don't need $rootScope.$apply()
        // but $httpBackend
        $httpBackend.flush();
    });
    it("get readers returns an array", function () {
        dataService.getAllReaders().then(function (data) {
            expect(data).to.exist;
        });
        // here we want digest cycle to kick off and resolve the promise to result
        // as we are not going to server for readers data but getting it from constant service
        // so no need for $http.flush
        $rootScope.$apply();
    });
});