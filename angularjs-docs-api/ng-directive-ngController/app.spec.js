describe("Controller Test", function () {

    // Arrange
    var controller;

    beforeEach(angular.mock.module("controllerAsExample"));

    beforeEach(angular.mock.inject(function ($controller, $rootScope) {
        var mockScope = $rootScope.$new();
        controller = $controller("SettingsController1", {
            $scope: mockScope,
        });
    }));

    it("makes sure contorller is created", function () {
        expect(controller).toBeTruthy();
    })
    it("contains name John Smith", function () {
        expect(controller.name).toEqual("John Smith");
    })

});
