'use strict';
describe("Controller", function () {
    // Arrange
    var mockScope, defaultCtrl;

    beforeEach(angular.mock.module("exampleApp"));

    beforeEach(angular.mock.inject(function ($controller, $rootScope) {
        mockScope = $rootScope.$new();
        defaultCtrl = $controller("defaultCtrl", {$scope: mockScope});
        // See http://juristr.com/blog/2014/11/learning-ng-testing-watch-expressions/
        // Note, in index.html we have declared: ng-controller="defaultCtrl as ctrl"
        mockScope.ctrl = defaultCtrl;
    }));

    // Act and Assess
    it("Creates variable", function () {
        expect(defaultCtrl.counter).toEqual(0);
    });

    it("Increments counter", function () {
        defaultCtrl.incrementCounter();
        expect(defaultCtrl.counter).toEqual(1);
    });

    it("Increments another counter", function () {
        defaultCtrl.incrementCounter();
        mockScope.$digest();
        expect(defaultCtrl.anotherCounter).toEqual(2);
    });
});
