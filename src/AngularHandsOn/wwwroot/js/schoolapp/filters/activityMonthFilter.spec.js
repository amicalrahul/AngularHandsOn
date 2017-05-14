describe('activity Month Filter', function () {
  
    var activityMonthFilter;
    var activities = mockData.getMockActivities();

    beforeEach(module('schoolBuddies'));

    beforeEach(inject(function (_$filter_) {
        activityMonthFilter = _$filter_('activityMonthFilter');
    }));

    it('should return all activities if no filterMonth is provided', function () {
        expect(activityMonthFilter(activities)).to.be.equal(activities);
    });
    it('should return matching activities if filterMonth is provided', function () {
        expect(activityMonthFilter(activities, 10)[0]).to.be.equal(activities[0]);
    });
});
