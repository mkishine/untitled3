describe("Directive Tests", function () {
    var mockScope;
    var compileService;
    var ideas = [
        ['ideas1', 1],
        ['ideas2', 8]];
    var scope,
        options,
        chart;
    beforeEach(angular.mock.module("myApp"));
    beforeEach(angular.mock.inject(function ($rootScope, $compile) {
        mockScope = $rootScope.$new();
        compileService = $compile;
        mockScope.mockIdeas = ideas;
    }));


    beforeEach(inject(function ($injector, $rootScope) {
        chart = jasmine.createSpyObj('chart', [
            'redraw',
            'setTitle',
            'hideLoading',
            'destroy',
            'get',
            'addSeries']);
        chart.series = [];

        window.Highcharts = {
            Chart: function (opt) {
                options = opt;
                return chart;
            },
        };
        scope = $rootScope;
    }));

    afterEach(function () {
        scope.$destroy();
    });

    it("Generates list elements", function () {
        var compileFn = compileService('<div class="hc-pie" items="mockIdeas"></div>');
        var elem = compileFn(mockScope);
        // console.log(JSON.stringify(options, null, 1));
        expect(options.title.text).toBe("Browser market shares at a specific website, 2010");
        expect(options.series[0].data).toEqual(ideas);
    });
});