var CreatePage = require('./pages/directive.page.js');
describe('angular directive app test', function () {
    var createPage = new CreatePage();
    beforeEach(function () {
        browser.get('http://localhost:44312/Home/NgDirective#/');       
    });
    it('Should display correct user name in panel heading', function () {
        var header = createPage.name;

        expect(header.getText()).toMatch('Luke Skywalker');
    });

    it('Should update the rank', function () {
        var button = createPage.knightMeButton;
        expect(button.getText()).toMatch('Knight Me');
        //createPage.updateRank();
        //browser.waitForAngular();
        var rank = createPage.rank;
        //expect(rank.getText()).toMatch('knight');
    });

});