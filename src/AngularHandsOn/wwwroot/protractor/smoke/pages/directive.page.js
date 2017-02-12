module.exports = function () {
    this.knightMeButton = element(by.buttonText('Knight Me'));
    this.name = element(by.binding('name'));
    this.rank = element(by.binding('rank'));
    this.updateRank = function () {
        this.knightMeButton.click();
    }
}