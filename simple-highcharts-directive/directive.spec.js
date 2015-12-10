var Highcharts = {
    Chart: function(){}
};

describe("Directive Tests", function () {
    var mockScope;
    var compileService;
    beforeEach(angular.mock.module("myApp"));
    beforeEach(angular.mock.inject(function ($rootScope, $compile) {
        mockScope = $rootScope.$new();
        compileService = $compile;
        mockScope.limitedIdeas = [
            ['ideas1', 1],
            ['ideas2', 8]];
    }));
    it("Generates list elements", function () {
        var compileFn = compileService('<div class="hc-pie" items="limitedIdeas"></div>');
        var elem = compileFn(mockScope);
    });
});