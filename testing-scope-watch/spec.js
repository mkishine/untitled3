'use strict';
describe("Controller", function () {
    // Arrange
    var mockScope, ctrl;

    beforeEach(angular.mock.module("exampleApp"));


    beforeEach(angular.mock.inject(function ($controller, $rootScope) {
        mockScope = $rootScope.$new();
        ctrl = $controller("defaultCtrl", {$scope: mockScope});
    }));

    // Act and Assess
    it("Creates variable", function () {
        expect(ctrl.counter).toEqual(0);
    })

    it("Increments counter", function () {
        ctrl.incrementCounter();
        expect(ctrl.counter).toEqual(1);
    });

    it("Increments another counter", function () {
        ctrl.incrementCounter();
        mockScope.$digest();
        expect(ctrl.anotherCounter).toEqual(2);
    });
});
