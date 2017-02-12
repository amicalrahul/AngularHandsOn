describe('angular directive app test', function () {
    var name;
    beforeEach(function () {
        browser.get('http://localhost:44312/Home/NgDirective#/');
        var firstElement = element.all(by.binding('name')).first();
        firstElement.getText().then(function (text) {
            name = text;
        });

        firstElement.click();

        browser.waitForAngular();
    });
    it('Should navigate to the details page', function () {
        var header = element(by.binding('name'));

        expect(header.getText()).toMatch('Luke Skywalker');
    });

    //it('Should update the url', function () {
    //    expect(browser.getCurrentUrl()).toMatch('EventRatings/');
    //});

});