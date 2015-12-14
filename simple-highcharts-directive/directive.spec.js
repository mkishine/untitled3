describe("Simple highchart directive", function () {
    //mock module
    beforeEach(angular.mock.module("myApp"));

    // mock scope
    var mockScope;
    var compileService;
    var ideas = [
        ['ideas1', 1],
        ['ideas2', 8]];
    beforeEach(angular.mock.inject(function ($rootScope, $compile) {
        mockScope = $rootScope.$new();
        compileService = $compile;
        mockScope.mockIdeas = ideas;
    }));

    // mock highcharts
    var options, series;
    beforeEach(function () {
        series = jasmine.createSpyObj('series', ['setData']);
        var chart = {
            series: [series]
        };
        window.Highcharts = {
            Chart: function (opt) {
                options = opt;
                return chart;
            },
        };
    });

    it("calls Highcharts.Chart constructor", function () {
        var compileFn = compileService('<div class="hc-pie" items="mockIdeas"></div>');
        var elem = compileFn(mockScope);
        // console.log(JSON.stringify(options, null, 1));
        expect(options.title.text).toBe("Browser market shares at a specific website, 2010");
        expect(options.series[0].data).toEqual(ideas);
    });
    // see http://juristr.com/blog/2014/11/learning-ng-testing-watch-expressions/
    // for more information on testing $watch expressions
    it("watches changes in data", function () {
        var compileFn = compileService('<div class="hc-pie" items="mockIdeas"></div>');
        var elem = compileFn(mockScope);
        ideas[0][1] = 2;
        mockScope.$digest();
        expect(series.setData).toHaveBeenCalledWith(ideas, true);
    });
});