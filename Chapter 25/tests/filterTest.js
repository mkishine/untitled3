describe("Filter Tests", function () {

    var filterInstance;

    beforeEach(angular.mock.module("exampleApp"));

    beforeEach(angular.mock.inject(function ($filter) {
        filterInstance = $filter("labelCase");
    }));

    it("Changes case", function () {
        var result = filterInstance("hello");
        expect(result).toEqual("Hello");
    });

    it("Reverse case", function () {
        var result = filterInstance("hello", true);
        expect(result).toEqual("hELLO");
    });

});
