'use strict';
describe("Controller", function () {
    // Arrange
    var mockScope, ctrl;

    beforeEach(angular.mock.module("exampleApp"));


    beforeEach(angular.mock.inject(function ($controller, $rootScope) {
        mockScope = $rootScope.$new();
        ctrl = $controller("defaultCtrl as ctrl", {$scope: mockScope});
        ctrl.mockScope = mockScope;
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
        ctrl.mockScope.$digest();
        expect(ctrl.anotherCounter).toEqual(2);
    });
});
